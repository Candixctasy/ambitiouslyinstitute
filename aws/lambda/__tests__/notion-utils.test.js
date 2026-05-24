import { describe, it, expect } from "vitest";
import { normalizePageSummary, normalizeBlock } from "../../../src/backend/notion-utils.js";

const BASE = {
    id: "page-1",
    last_edited_time: "2026-05-21T12:00:00Z",
    url: "https://notion.so/page-1",
};

// ── Point 3: normalizePageSummary ─────────────────────────────────────────────

describe("normalizePageSummary", () => {
    it("extracts title from the Title property", () => {
        const page = {
            ...BASE,
            properties: { Title: { title: [{ plain_text: "My Ops Page" }] } },
        };
        expect(normalizePageSummary(page).title).toBe("My Ops Page");
    });

    it("falls back to the Name property when Title is absent", () => {
        const page = {
            ...BASE,
            properties: { Name: { title: [{ plain_text: "Fallback Name" }] } },
        };
        expect(normalizePageSummary(page).title).toBe("Fallback Name");
    });

    it("returns 'Untitled' when neither Title nor Name is present", () => {
        const page = { ...BASE, properties: {} };
        expect(normalizePageSummary(page).title).toBe("Untitled");
    });

    it("concatenates multi-part title rich-text runs", () => {
        const page = {
            ...BASE,
            properties: {
                Title: { title: [{ plain_text: "Part 1" }, { plain_text: " Part 2" }] },
            },
        };
        expect(normalizePageSummary(page).title).toBe("Part 1 Part 2");
    });

    it("maps optional Category, Status, and Owner fields", () => {
        const page = {
            ...BASE,
            properties: {
                Title: { title: [{ plain_text: "T" }] },
                Category: { select: { name: "Operations" } },
                Status: { status: { name: "Live" } },
                Owner: { people: [{ name: "Conrad" }] },
            },
        };
        const result = normalizePageSummary(page);
        expect(result.category).toBe("Operations");
        expect(result.status).toBe("Live");
        expect(result.owner).toBe("Conrad");
    });

    it("returns null for missing optional fields", () => {
        const page = {
            ...BASE,
            properties: { Title: { title: [{ plain_text: "T" }] } },
        };
        const result = normalizePageSummary(page);
        expect(result.category).toBeNull();
        expect(result.status).toBeNull();
        expect(result.owner).toBeNull();
    });

    it("passes through id, lastEdited, and url unchanged", () => {
        const page = { ...BASE, properties: { Title: { title: [{ plain_text: "T" }] } } };
        const result = normalizePageSummary(page);
        expect(result.id).toBe("page-1");
        expect(result.lastEdited).toBe("2026-05-21T12:00:00Z");
        expect(result.url).toBe("https://notion.so/page-1");
    });
});

// ── Point 3: normalizeBlock ───────────────────────────────────────────────────

describe("normalizeBlock", () => {
    it("extracts and concatenates rich_text plain_text runs", () => {
        const block = {
            id: "b1",
            type: "paragraph",
            paragraph: { rich_text: [{ plain_text: "Hello " }, { plain_text: "world" }] },
        };
        expect(normalizeBlock(block).text).toBe("Hello world");
    });

    it("returns empty string when the block type has no rich_text", () => {
        const block = { id: "b2", type: "divider", divider: {} };
        expect(normalizeBlock(block).text).toBe("");
    });

    it("returns empty string when the block content is missing entirely", () => {
        const block = { id: "b3", type: "image", image: undefined };
        expect(normalizeBlock(block).text).toBe("");
    });

    it("preserves block id and type", () => {
        const block = {
            id: "b4",
            type: "heading_1",
            heading_1: { rich_text: [{ plain_text: "Big Title" }] },
        };
        const result = normalizeBlock(block);
        expect(result.id).toBe("b4");
        expect(result.type).toBe("heading_1");
    });

    it("handles a callout block with multiple text runs", () => {
        const block = {
            id: "b5",
            type: "callout",
            callout: {
                rich_text: [
                    { plain_text: "Note: " },
                    { plain_text: "barrier repair first" },
                ],
            },
        };
        expect(normalizeBlock(block).text).toBe("Note: barrier repair first");
    });
});
