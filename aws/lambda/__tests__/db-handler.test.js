import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// vi.hoisted ensures mockSend is available inside the mock factory (factories run before imports)
const mockSend = vi.hoisted(() => vi.fn());

vi.mock("@aws-sdk/client-dynamodb", () => ({
    DynamoDBClient: vi.fn(() => ({ send: mockSend })),
    GetItemCommand: vi.fn((p) => p),
    PutItemCommand: vi.fn((p) => p),
    QueryCommand: vi.fn((p) => p),
    ScanCommand: vi.fn((p) => p),
}));

vi.mock("@aws-sdk/util-dynamodb", () => ({
    marshall: vi.fn((x) => x),
    unmarshall: vi.fn((x) => x),
}));

import { handler, checkBirthday } from "../db-handler.js";
import { QueryCommand, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

// ── Helpers ───────────────────────────────────────────────────────────────────

function get(path, qs = {}) {
    return { httpMethod: "GET", path, queryStringParameters: qs, body: null };
}

function post(path, body) {
    return { httpMethod: "POST", path, queryStringParameters: {}, body: JSON.stringify(body) };
}

beforeEach(() => {
    vi.clearAllMocks();
});

// ── Point 1: checkBirthday ────────────────────────────────────────────────────

describe("checkBirthday", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-05-21"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns true when month and day match today", () => {
        expect(checkBirthday(5, 21)).toBe(true);
    });

    it("returns false when month does not match", () => {
        expect(checkBirthday(6, 21)).toBe(false);
    });

    it("returns false when day does not match", () => {
        expect(checkBirthday(5, 22)).toBe(false);
    });

    it("returns false when month is missing", () => {
        expect(checkBirthday(null, 21)).toBe(false);
    });

    it("returns false when day is missing", () => {
        expect(checkBirthday(5, undefined)).toBe(false);
    });
});

// ── Point 2: getDiscount ──────────────────────────────────────────────────────

describe("getDiscount", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-05-21"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns base 10% consumer discount on a non-birthday", async () => {
        mockSend.mockResolvedValueOnce({
            Item: { email: "a@b.com", status: "active", discountRate: 10, birthdayMonth: 6, birthdayDay: 15 },
        });
        const res = await handler(get("/alist/discount", { email: "a@b.com", tier: "consumer" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(10);
        expect(body.isBirthday).toBe(false);
        expect(body.birthdayBonus).toBe(0);
    });

    it("adds 30% birthday bonus for consumer (10 + 30 = 40)", async () => {
        mockSend.mockResolvedValueOnce({
            Item: { email: "a@b.com", status: "active", discountRate: 10, birthdayMonth: 5, birthdayDay: 21 },
        });
        const res = await handler(get("/alist/discount", { email: "a@b.com", tier: "consumer" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(40);
        expect(body.isBirthday).toBe(true);
        expect(body.birthdayBonus).toBe(30);
    });

    it("adds 20% birthday bonus for professional (30 + 20 = 50)", async () => {
        mockSend.mockResolvedValueOnce({
            Item: { email: "a@b.com", status: "active", discountRate: 30, birthdayMonth: 5, birthdayDay: 21 },
        });
        const res = await handler(get("/alist/discount", { email: "a@b.com", tier: "professional" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(50);
        expect(body.isBirthday).toBe(true);
        expect(body.birthdayBonus).toBe(20);
    });

    it("caps combined discount at 50% (custom 30% + 30% birthday bonus = 60 → 50)", async () => {
        mockSend.mockResolvedValueOnce({
            Item: { email: "a@b.com", status: "active", discountRate: 30, birthdayMonth: 5, birthdayDay: 21 },
        });
        const res = await handler(get("/alist/discount", { email: "a@b.com", tier: "consumer" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(50);
        expect(body.baseDiscount + body.birthdayBonus).toBeGreaterThan(50);
    });

    it("returns discount 0 for an inactive member", async () => {
        mockSend.mockResolvedValueOnce({
            Item: { email: "a@b.com", status: "inactive", discountRate: 10 },
        });
        const res = await handler(get("/alist/discount", { email: "a@b.com" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(0);
        expect(body.reason).toBe("not an active A List member");
    });

    it("returns discount 0 when member not found", async () => {
        mockSend.mockResolvedValueOnce({ Item: undefined });
        const res = await handler(get("/alist/discount", { email: "ghost@b.com" }));
        const body = JSON.parse(res.body);
        expect(body.discount).toBe(0);
    });
});

// ── Point 4: handler route dispatch ──────────────────────────────────────────

describe("handler routing", () => {
    it("OPTIONS returns 200 with an empty body", async () => {
        const res = await handler({ httpMethod: "OPTIONS", path: "/", queryStringParameters: {}, body: null });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("");
    });

    it("invalid JSON body returns 400", async () => {
        const res = await handler({ httpMethod: "POST", path: "/contacts", queryStringParameters: {}, body: "not json{" });
        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res.body).error).toBe("Invalid JSON");
    });

    it("unknown path returns 404", async () => {
        const res = await handler(get("/does-not-exist"));
        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res.body).error).toBe("Not found");
    });

    it("GET /institute/enrollments uses QueryCommand with programId condition", async () => {
        mockSend.mockResolvedValueOnce({ Items: [{ memberId: "u1", programId: "eba-core" }] });
        const res = await handler(get("/institute/enrollments", { program: "eba-core" }));
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).enrollments).toHaveLength(1);
        expect(QueryCommand).toHaveBeenCalledWith(
            expect.objectContaining({ KeyConditionExpression: "programId = :pid" })
        );
    });

    it("GET /bybobo/products (no category) uses ScanCommand", async () => {
        mockSend.mockResolvedValueOnce({ Items: [{ sku: "p1" }] });
        const res = await handler(get("/bybobo/products"));
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).products).toHaveLength(1);
        expect(ScanCommand).toHaveBeenCalled();
        expect(QueryCommand).not.toHaveBeenCalled();
    });

    it("GET /bybobo/products?category=serum uses QueryCommand on category-index", async () => {
        mockSend.mockResolvedValueOnce({ Items: [] });
        await handler(get("/bybobo/products", { category: "serum" }));
        expect(QueryCommand).toHaveBeenCalledWith(
            expect.objectContaining({ IndexName: "category-index" })
        );
    });

    it("POST /alist/members routes to joinAList (consumer tier)", async () => {
        mockSend.mockResolvedValueOnce({});
        const res = await handler(post("/alist/members", { email: "consumer@example.com", name: "Jane" }));
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).tier).toBe("consumer");
    });

    it("POST /alist/pro/members routes to joinAListPro, not joinAList", async () => {
        mockSend.mockResolvedValueOnce({});
        const res = await handler(post("/alist/pro/members", {
            email: "pro@example.com",
            licenseNumber: "EST-12345",
        }));
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.tier).toBe("professional");
        expect(body.status).toBe("pending_verification");
    });

    it("GET /analytics is restricted to SiteOwner — handler dispatches to getAnalytics", async () => {
        mockSend
            .mockResolvedValueOnce({ Count: 120 })  // alist scan
            .mockResolvedValueOnce({ Count: 15 })   // alistPro scan
            .mockResolvedValueOnce({ Count: 300 })  // ski scan
            .mockResolvedValueOnce({ Count: 500 }); // contacts scan
        const res = await handler(post("/analytics", {}));
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.alistConsumerMembers).toBe(120);
        expect(body.alistProMembers).toBe(15);
    });
});

// ── Point 5: joinAListPro validation ─────────────────────────────────────────

describe("joinAListPro validation", () => {
    it("returns 500 when email is missing (validation throws, caught by handler)", async () => {
        const res = await handler(post("/alist/pro/members", { licenseNumber: "EST-123" }));
        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res.body).error).toBe("Internal error");
    });

    it("returns 500 when neither licenseNumber nor ebosCompleted is provided", async () => {
        const res = await handler(post("/alist/pro/members", { email: "pro@example.com" }));
        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res.body).error).toBe("Internal error");
    });

    it("succeeds with licenseNumber only", async () => {
        mockSend.mockResolvedValueOnce({});
        const res = await handler(post("/alist/pro/members", {
            email: "pro@example.com",
            licenseNumber: "EST-12345",
        }));
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.joined).toBe(true);
        expect(body.tier).toBe("professional");
        expect(body.status).toBe("pending_verification");
    });

    it("succeeds with ebosCompleted only", async () => {
        mockSend.mockResolvedValueOnce({});
        const res = await handler(post("/alist/pro/members", {
            email: "pro@example.com",
            ebosCompleted: true,
        }));
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).joined).toBe(true);
    });

    it("succeeds when both licenseNumber and ebosCompleted are present", async () => {
        mockSend.mockResolvedValueOnce({});
        const res = await handler(post("/alist/pro/members", {
            email: "pro@example.com",
            licenseNumber: "EST-12345",
            ebosCompleted: true,
        }));
        expect(res.statusCode).toBe(200);
    });

    it("stores the member with pending_verification status via PutItemCommand", async () => {
        mockSend.mockResolvedValueOnce({});
        await handler(post("/alist/pro/members", {
            email: "pro@example.com",
            licenseNumber: "EST-12345",
        }));
        expect(PutItemCommand).toHaveBeenCalledWith(
            expect.objectContaining({
                Item: expect.objectContaining({ status: "pending_verification", tier: "professional" }),
            })
        );
    });
});

// ── Point 6: listEncyclopedia filter builder ──────────────────────────────────

describe("listEncyclopedia filter builder", () => {
    it("uses ScanCommand with published=true filter when no params given", async () => {
        mockSend.mockResolvedValueOnce({ Items: [] });
        await handler(get("/bybobo/encyclopedia", {}));
        expect(QueryCommand).not.toHaveBeenCalled();
        expect(ScanCommand).toHaveBeenCalledWith(
            expect.objectContaining({
                FilterExpression: "isPublished = :pub",
                ExpressionAttributeValues: { ":pub": "true" },
                Limit: 50,
            })
        );
    });

    it("uses QueryCommand on category-index when category is provided", async () => {
        mockSend.mockResolvedValueOnce({ Items: [], Count: 0 });
        await handler(get("/bybobo/encyclopedia", { category: "hydrator" }));
        expect(ScanCommand).not.toHaveBeenCalled();
        expect(QueryCommand).toHaveBeenCalledWith(
            expect.objectContaining({
                IndexName: "category-index",
                KeyConditionExpression: "category = :cat",
                ExpressionAttributeValues: { ":cat": "hydrator" },
            })
        );
    });

    it("adds correct FilterExpression and ExpressionAttributeNames for a single sourcing flag", async () => {
        mockSend.mockResolvedValueOnce({ Items: [] });
        await handler(get("/bybobo/encyclopedia", { sourcing: "vegan" }));
        const params = ScanCommand.mock.calls[0][0];
        expect(params.FilterExpression).toBe("isPublished = :pub AND #s0 = :sv0");
        expect(params.ExpressionAttributeNames).toEqual({ "#s0": "vegan" });
        expect(params.ExpressionAttributeValues).toEqual({ ":pub": "true", ":sv0": true });
    });

    it("correctly aliases multiple sourcing flags with sequential #s0, #s1 names", async () => {
        mockSend.mockResolvedValueOnce({ Items: [] });
        await handler(get("/bybobo/encyclopedia", { sourcing: "vegan,organic" }));
        const params = ScanCommand.mock.calls[0][0];
        expect(params.FilterExpression).toBe("isPublished = :pub AND #s0 = :sv0 AND #s1 = :sv1");
        expect(params.ExpressionAttributeNames).toEqual({ "#s0": "vegan", "#s1": "organic" });
        expect(params.ExpressionAttributeValues).toEqual({ ":pub": "true", ":sv0": true, ":sv1": true });
    });

    it("applies client-side search filter on name, inciName, primaryFunction, and category", async () => {
        mockSend.mockResolvedValueOnce({
            Items: [
                { name: "Niacinamide", inciName: "Niacinamide", primaryFunction: "brightening", category: "vitamin" },
                { name: "Retinol", inciName: "Retinol", primaryFunction: "anti-aging", category: "vitamin" },
            ],
        });
        const res = await handler(get("/bybobo/encyclopedia", { search: "niacinamide" }));
        const body = JSON.parse(res.body);
        expect(body.ingredients).toHaveLength(1);
        expect(body.ingredients[0].name).toBe("Niacinamide");
    });

    it("caps limit at 100 regardless of query param value", async () => {
        mockSend.mockResolvedValueOnce({ Items: [] });
        await handler(get("/bybobo/encyclopedia", { limit: "500" }));
        const params = ScanCommand.mock.calls[0][0];
        expect(params.Limit).toBe(100);
    });
});
