// analytics.web.js — server-side analytics helpers for Ambitiously Institute admin.
// These run on the backend so the analytics endpoint (with API key) is never exposed.

import { Permissions, webMethod } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

async function dbGet(path) {
    const [url, key] = await Promise.all([
        getSecret("DB_API_URL"),
        getSecret("DB_API_KEY"),
    ]);
    const res = await fetch(`${url}${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-api-key": key },
    });
    if (!res.ok) throw new Error(`DB error ${res.status} on ${path}`);
    return res.json();
}

async function dbPost(path, body) {
    const [url, key] = await Promise.all([
        getSecret("DB_API_URL"),
        getSecret("DB_API_KEY"),
    ]);
    const res = await fetch(`${url}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`DB error ${res.status} on ${path}`);
    return res.json();
}

// Returns aggregate counts — A List consumer/pro members, SKI assessments, total contacts.
// Admin-only: SiteOwner permission.
export const getDashboardAnalytics = webMethod(
    Permissions.SiteOwner,
    async ({ startDate, endDate } = {}) =>
        dbPost("/analytics", { startDate, endDate })
);

// Admin: get all A List consumer members.
export const getAllAListMembers = webMethod(
    Permissions.SiteOwner,
    async () => dbGet("/alist/members")
);

// Admin: get all professional A List members.
export const getAllAListProMembers = webMethod(
    Permissions.SiteOwner,
    async () => dbGet("/alist/pro/members")
);

// Upserts a contact record (called from any public form — contact, newsletter, etc.)
// Public: Anyone can submit a contact.
export const submitContact = webMethod(
    Permissions.Anyone,
    async (contact) => dbPost("/contacts", contact)
);
