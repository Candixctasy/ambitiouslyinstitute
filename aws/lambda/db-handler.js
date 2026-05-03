// Database Lambda — DynamoDB operations for:
//   • Ambitiously Institute (enrollments, progress, curriculum)
//   • By BoBo consumer site (products, SKI assessments)
//   • A List consumer membership (retail + services, skin tracking, discounts)
//   • Professional A-List (treatment products, wholesale, pro benefits)

import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({ region: "ca-central-1" });

const T = {
    contacts:        process.env.CONTACTS_TABLE,
    enrollments:     process.env.ENROLLMENTS_TABLE,
    progress:        process.env.PROGRESS_TABLE,
    curriculum:      process.env.CURRICULUM_TABLE,
    products:        process.env.PRODUCTS_TABLE,
    ski:             process.env.SKI_TABLE,
    alist:           process.env.ALIST_TABLE,
    alistPro:        process.env.ALIST_PRO_TABLE,
    skinTracking:    process.env.SKIN_TRACKING_TABLE,
};

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const CORS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type,x-api-key",
    "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
    "Content-Type": "application/json",
};

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: CORS, body: "" };
    }

    const path    = event.path || event.rawPath || "/";
    const method  = event.httpMethod || event.requestContext?.http?.method;
    const qs      = event.queryStringParameters || {};
    let body = {};
    try { if (event.body) body = JSON.parse(event.body); }
    catch { return err(400, "Invalid JSON"); }

    try {
        // ── Institute ──────────────────────────────────────────────────────────
        if (path.includes("/institute/enrollments") && method === "GET")
            return ok(await getEnrollments(qs.program));
        if (path.includes("/institute/progress") && method === "POST")
            return ok(await saveProgress(body));
        if (path.match(/\/institute\/curriculum\/.+/) && method === "GET")
            return ok(await getCurriculum(path.split("/").pop()));

        // ── By BoBo products & SKI ─────────────────────────────────────────────
        if (path.includes("/bybobo/products") && method === "GET")
            return ok(await getProducts(qs.category));
        if (path.includes("/bybobo/ski-assessments") && method === "POST")
            return ok(await saveSKI(body));
        if (path.includes("/bybobo/ski-assessments") && method === "GET")
            return ok(await getClientSKI(qs.email));

        // ── A List — consumer ──────────────────────────────────────────────────
        if (path.includes("/alist/members") && !path.includes("pro") && method === "POST")
            return ok(await joinAList(body));
        if (path.includes("/alist/members") && !path.includes("pro") && method === "GET")
            return ok(await getAListMember(qs.email));

        // ── A List — professional ──────────────────────────────────────────────
        if (path.includes("/alist/pro/members") && method === "POST")
            return ok(await joinAListPro(body));
        if (path.includes("/alist/pro/members") && method === "GET")
            return ok(await getAListProMember(qs.email));
        if (path.includes("/alist/pro/products") && method === "GET")
            return ok(await getProProducts(qs.category));

        // ── Skin tracking (both tiers) ─────────────────────────────────────────
        if (path.includes("/alist/skin-tracking") && method === "POST")
            return ok(await logSkinCheckIn(body));
        if (path.includes("/alist/skin-tracking") && method === "GET")
            return ok(await getSkinHistory(qs.email));

        // ── Discount ──────────────────────────────────────────────────────────
        if (path.includes("/alist/discount") && method === "GET")
            return ok(await getDiscount(qs.email, qs.tier));

        // ── Shared ────────────────────────────────────────────────────────────
        if (path.includes("/contacts") && method === "POST")
            return ok(await upsertContact(body));
        if (path.includes("/analytics") && method === "POST")
            return ok(await getAnalytics(body));

        return err(404, "Not found");
    } catch (e) {
        console.error("DB error:", e);
        return err(500, "Internal error");
    }
};

// ── Institute ─────────────────────────────────────────────────────────────────

async function getEnrollments(programId) {
    if (!programId) throw new Error("program required");
    const r = await db.send(new QueryCommand({
        TableName: T.enrollments,
        KeyConditionExpression: "programId = :pid",
        ExpressionAttributeValues: marshall({ ":pid": programId }),
    }));
    return { enrollments: r.Items.map(unmarshall) };
}

async function saveProgress({ memberId, lessonId, ...rest }) {
    if (!memberId || !lessonId) throw new Error("memberId and lessonId required");
    await db.send(new PutItemCommand({
        TableName: T.progress,
        Item: marshall({ memberId, lessonId, updatedAt: now(), ...rest }),
    }));
    return { saved: true };
}

async function getCurriculum(programId) {
    const r = await db.send(new GetItemCommand({
        TableName: T.curriculum,
        Key: marshall({ programId }),
    }));
    return { curriculum: r.Item ? unmarshall(r.Item) : null };
}

// ── By BoBo ───────────────────────────────────────────────────────────────────

async function getProducts(category) {
    if (category) {
        const r = await db.send(new QueryCommand({
            TableName: T.products,
            IndexName: "category-index",
            KeyConditionExpression: "category = :cat",
            ExpressionAttributeValues: marshall({ ":cat": category }),
        }));
        return { products: r.Items.map(unmarshall) };
    }
    const r = await db.send(new ScanCommand({ TableName: T.products }));
    return { products: r.Items.map(unmarshall) };
}

async function saveSKI(assessment) {
    if (!assessment.email) throw new Error("email required");
    const item = { ...assessment, submittedAt: now(), status: "pending_review" };
    await db.send(new PutItemCommand({ TableName: T.ski, Item: marshall(item) }));
    return { saved: true, submittedAt: item.submittedAt };
}

async function getClientSKI(email) {
    if (!email) throw new Error("email required");
    const r = await db.send(new QueryCommand({
        TableName: T.ski,
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: marshall({ ":e": email }),
        ScanIndexForward: false,
    }));
    return { assessments: r.Items.map(unmarshall) };
}

// ── A List — consumer ─────────────────────────────────────────────────────────
// Benefits: personalized formulation, ongoing skin tracking,
//           priority product access, 10% off always, 30% off birthday (day-of)

async function joinAList(data) {
    if (!data.email) throw new Error("email required");
    const item = {
        ...data,
        tier: "consumer",
        discountRate: 10,
        joinedAt: now(),
        updatedAt: now(),
        status: "active",
    };
    await db.send(new PutItemCommand({ TableName: T.alist, Item: marshall(item) }));
    return { joined: true, tier: "consumer" };
}

async function getAListMember(email) {
    if (!email) throw new Error("email required");
    const r = await db.send(new GetItemCommand({
        TableName: T.alist,
        Key: marshall({ email }),
    }));
    return { member: r.Item ? unmarshall(r.Item) : null };
}

// ── A List — professional ─────────────────────────────────────────────────────
// Benefits: professional treatment products at wholesale, application-gated,
//           requires proof of license or Institute EBOS completion

async function joinAListPro(data) {
    if (!data.email) throw new Error("email required");
    if (!data.licenseNumber && !data.ebosCompleted)
        throw new Error("professional license or EBOS completion required");

    const item = {
        ...data,
        tier: "professional",
        wholesaleDiscount: 30,      // 30% off treatment products
        birthdayDiscount: 20,       // 20% birthday (stacks)
        joinedAt: now(),
        updatedAt: now(),
        status: "pending_verification",
    };
    await db.send(new PutItemCommand({ TableName: T.alistPro, Item: marshall(item) }));
    return { joined: true, tier: "professional", status: "pending_verification" };
}

async function getAListProMember(email) {
    if (!email) throw new Error("email required");
    const r = await db.send(new GetItemCommand({
        TableName: T.alistPro,
        Key: marshall({ email }),
    }));
    return { member: r.Item ? unmarshall(r.Item) : null };
}

async function getProProducts(category) {
    const filter = category
        ? { FilterExpression: "category = :cat AND tier = :t",
            ExpressionAttributeValues: marshall({ ":cat": category, ":t": "professional" }) }
        : { FilterExpression: "tier = :t",
            ExpressionAttributeValues: marshall({ ":t": "professional" }) };

    const r = await db.send(new ScanCommand({ TableName: T.products, ...filter }));
    return { products: r.Items.map(unmarshall) };
}

// ── Skin tracking ─────────────────────────────────────────────────────────────

async function logSkinCheckIn(data) {
    if (!data.email) throw new Error("email required");
    const item = { ...data, trackedAt: now() };
    await db.send(new PutItemCommand({ TableName: T.skinTracking, Item: marshall(item) }));
    return { saved: true, trackedAt: item.trackedAt };
}

async function getSkinHistory(email) {
    if (!email) throw new Error("email required");
    const r = await db.send(new QueryCommand({
        TableName: T.skinTracking,
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: marshall({ ":e": email }),
        ScanIndexForward: false,
        Limit: 24,   // last 24 check-ins (~2 years monthly)
    }));
    return { history: r.Items.map(unmarshall) };
}

// ── Discounts ─────────────────────────────────────────────────────────────────

async function getDiscount(email, tier = "consumer") {
    if (!email) throw new Error("email required");

    const table  = tier === "professional" ? T.alistPro : T.alist;
    const r = await db.send(new GetItemCommand({ TableName: table, Key: marshall({ email }) }));
    const member = r.Item ? unmarshall(r.Item) : null;

    if (!member || member.status !== "active")
        return { discount: 0, reason: "not an active A List member" };

    const baseRate   = member.discountRate || (tier === "professional" ? 30 : 10);
    const isBirthday = checkBirthday(member.birthdayMonth, member.birthdayDay);
    const birthdayBonus = isBirthday
        ? (tier === "professional" ? 20 : 30)
        : 0;

    return {
        discount: Math.min(baseRate + birthdayBonus, 50),   // cap at 50%
        baseDiscount: baseRate,
        birthdayBonus,
        isBirthday,
        tier,
    };
}

function checkBirthday(month, day) {
    if (!month || !day) return false;
    const today = new Date();
    return today.getMonth() + 1 === Number(month) && today.getDate() === Number(day);
}

// ── Shared ────────────────────────────────────────────────────────────────────

async function upsertContact(contact) {
    if (!contact.email) throw new Error("email required");
    await db.send(new PutItemCommand({
        TableName: T.contacts,
        Item: marshall({ ...contact, updatedAt: now() }),
    }));
    return { saved: true };
}

async function getAnalytics({ startDate, endDate } = {}) {
    const [cons, pros, ski, contacts] = await Promise.all([
        db.send(new ScanCommand({ TableName: T.alist, Select: "COUNT" })),
        db.send(new ScanCommand({ TableName: T.alistPro, Select: "COUNT" })),
        db.send(new ScanCommand({ TableName: T.ski, Select: "COUNT" })),
        db.send(new ScanCommand({ TableName: T.contacts, Select: "COUNT" })),
    ]);
    return {
        alistConsumerMembers: cons.Count,
        alistProMembers: pros.Count,
        skiAssessments: ski.Count,
        totalContacts: contacts.Count,
        period: { startDate, endDate },
        generatedAt: now(),
    };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function now() { return new Date().toISOString(); }

function ok(data) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify(data) };
}

function err(status, message) {
    return { statusCode: status, headers: CORS, body: JSON.stringify({ error: message }) };
}
