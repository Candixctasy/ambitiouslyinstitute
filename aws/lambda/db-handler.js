// Database Lambda — handles all DynamoDB operations for Ambitiously Institute
// and Ambitiously By BoBo, exposed via API Gateway routes defined in template.yaml.

import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({});

const TABLES = {
    contacts: process.env.CONTACTS_TABLE,
    enrollments: process.env.ENROLLMENTS_TABLE,
    progress: process.env.PROGRESS_TABLE,
    curriculum: process.env.CURRICULUM_TABLE,
    products: process.env.PRODUCTS_TABLE,
    ski: process.env.SKI_TABLE,
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

    const path = event.path || event.rawPath || "/";
    const method = event.httpMethod || event.requestContext?.http?.method;
    const qs = event.queryStringParameters || {};

    let body = {};
    try {
        if (event.body) body = JSON.parse(event.body);
    } catch {
        return error(400, "Invalid JSON");
    }

    try {
        // Institute routes
        if (path.includes("/institute/enrollments") && method === "GET")
            return ok(await getEnrollments(qs.program));

        if (path.includes("/institute/progress") && method === "POST")
            return ok(await saveProgress(body));

        if (path.match(/\/institute\/curriculum\/(.+)/) && method === "GET") {
            const programId = path.split("/").pop();
            return ok(await getCurriculum(programId));
        }

        // By BoBo routes
        if (path.includes("/bybobo/products") && method === "GET")
            return ok(await getProducts(qs.category));

        if (path.includes("/bybobo/ski-assessments") && method === "POST")
            return ok(await saveSKI(body));

        if (path.includes("/bybobo/ski-assessments") && method === "GET")
            return ok(await getClientSKI(qs.email));

        // Shared routes
        if (path.includes("/contacts") && method === "POST")
            return ok(await upsertContact(body));

        if (path.includes("/analytics") && method === "POST")
            return ok(await getAnalytics(body));

        return error(404, "Not found");
    } catch (err) {
        console.error("DB handler error:", err);
        return error(500, "Internal error");
    }
};

// ── Institute ─────────────────────────────────────────────────────────────────

async function getEnrollments(programId) {
    if (!programId) return error(400, "program query param required");

    const result = await db.send(new QueryCommand({
        TableName: TABLES.enrollments,
        KeyConditionExpression: "programId = :pid",
        ExpressionAttributeValues: marshall({ ":pid": programId }),
    }));

    return { enrollments: result.Items.map(unmarshall) };
}

async function saveProgress(progress) {
    const { memberId, lessonId, ...rest } = progress;
    if (!memberId || !lessonId) throw new Error("memberId and lessonId required");

    const item = { memberId, lessonId, updatedAt: new Date().toISOString(), ...rest };
    await db.send(new PutItemCommand({
        TableName: TABLES.progress,
        Item: marshall(item),
    }));

    return { saved: true };
}

async function getCurriculum(programId) {
    const result = await db.send(new GetItemCommand({
        TableName: TABLES.curriculum,
        Key: marshall({ programId }),
    }));

    if (!result.Item) return { curriculum: null };
    return { curriculum: unmarshall(result.Item) };
}

// ── By BoBo ───────────────────────────────────────────────────────────────────

async function getProducts(category) {
    if (category) {
        const result = await db.send(new QueryCommand({
            TableName: TABLES.products,
            IndexName: "category-index",
            KeyConditionExpression: "category = :cat",
            ExpressionAttributeValues: marshall({ ":cat": category }),
        }));
        return { products: result.Items.map(unmarshall) };
    }

    const result = await db.send(new ScanCommand({ TableName: TABLES.products }));
    return { products: result.Items.map(unmarshall) };
}

async function saveSKI(assessment) {
    const item = {
        ...assessment,
        submittedAt: new Date().toISOString(),
        status: "pending_review",
    };

    if (!item.email) throw new Error("email is required");

    await db.send(new PutItemCommand({
        TableName: TABLES.ski,
        Item: marshall(item),
    }));

    return { saved: true, submittedAt: item.submittedAt };
}

async function getClientSKI(email) {
    if (!email) throw new Error("email query param required");

    const result = await db.send(new QueryCommand({
        TableName: TABLES.ski,
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: marshall({ ":email": email }),
        ScanIndexForward: false, // newest first
    }));

    return { assessments: result.Items.map(unmarshall) };
}

// ── Shared ────────────────────────────────────────────────────────────────────

async function upsertContact(contact) {
    if (!contact.email) throw new Error("email is required");

    const item = { ...contact, updatedAt: new Date().toISOString() };

    await db.send(new PutItemCommand({
        TableName: TABLES.contacts,
        Item: marshall(item),
    }));

    return { saved: true };
}

async function getAnalytics({ startDate, endDate } = {}) {
    const [enrollments, assessments, contacts] = await Promise.all([
        db.send(new ScanCommand({ TableName: TABLES.enrollments, Select: "COUNT" })),
        db.send(new ScanCommand({ TableName: TABLES.ski, Select: "COUNT" })),
        db.send(new ScanCommand({ TableName: TABLES.contacts, Select: "COUNT" })),
    ]);

    return {
        totalEnrollments: enrollments.Count,
        totalSKIAssessments: assessments.Count,
        totalContacts: contacts.Count,
        period: { startDate, endDate },
        generatedAt: new Date().toISOString(),
    };
}

function ok(data) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify(data) };
}

function error(status, message) {
    return { statusCode: status, headers: CORS, body: JSON.stringify({ error: message }) };
}
