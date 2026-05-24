// Notion integration for the Ambitiously Institute operations manual.
// Secrets required in Wix Secrets Manager:
//   NOTION_API_KEY   — Notion integration token (secret_...)
//   NOTION_OPS_DB_ID — ID of the Operations Manual database in Notion

import { Permissions, webMethod } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";
import { normalizePageSummary, normalizeBlock } from "backend/notion-utils";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

async function notionHeaders() {
    const key = await getSecret("NOTION_API_KEY");
    return {
        Authorization: `Bearer ${key}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    };
}

// Returns all pages in the operations manual database, sorted by title.
export const getOperationsManual = webMethod(
    Permissions.SiteMember,
    async () => {
        const dbId = await getSecret("NOTION_OPS_DB_ID");
        const headers = await notionHeaders();

        const response = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                sorts: [{ property: "Title", direction: "ascending" }],
            }),
        });

        if (!response.ok) {
            throw new Error(`Notion API error: ${response.status}`);
        }

        const data = await response.json();
        return data.results.map(normalizePageSummary);
    }
);

// Returns the full content of a single operations manual page.
export const getOperationsPage = webMethod(
    Permissions.SiteMember,
    async (pageId) => {
        const headers = await notionHeaders();

        const [pageMeta, blocksRes] = await Promise.all([
            fetch(`${NOTION_API}/pages/${pageId}`, { headers }),
            fetch(`${NOTION_API}/blocks/${pageId}/children?page_size=100`, { headers }),
        ]);

        if (!pageMeta.ok || !blocksRes.ok) {
            throw new Error("Failed to fetch Notion page content");
        }

        const [page, blocks] = await Promise.all([
            pageMeta.json(),
            blocksRes.json(),
        ]);

        return {
            ...normalizePageSummary(page),
            blocks: blocks.results.map(normalizeBlock),
        };
    }
);

// Searches the operations manual by keyword.
export const searchOperationsManual = webMethod(
    Permissions.SiteMember,
    async (query) => {
        const headers = await notionHeaders();

        const response = await fetch(`${NOTION_API}/search`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query,
                filter: { value: "page", property: "object" },
                sort: { direction: "descending", timestamp: "last_edited_time" },
            }),
        });

        if (!response.ok) {
            throw new Error(`Notion search error: ${response.status}`);
        }

        const data = await response.json();
        return data.results.map(normalizePageSummary);
    }
);

