// Shared database layer for Ambitiously Institute and Ambitiously By BoBo.
// Routes queries to the AWS API Gateway data endpoint.
// Secrets required in Wix Secrets Manager:
//   DB_API_URL — base URL of the AWS data API (e.g. API Gateway + Lambda/RDS Proxy)
//   DB_API_KEY — API key for the data endpoint

import { Permissions, webMethod } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

async function dbRequest(method, path, body) {
    const [url, key] = await Promise.all([
        getSecret("DB_API_URL"),
        getSecret("DB_API_KEY"),
    ]);

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": key,
        },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        throw new Error(`DB API error (${response.status}) on ${path}`);
    }

    return response.json();
}

// ── Ambitiously Institute ─────────────────────────────────────────────────────

// Returns enrolled members for a program (programId: e.g. "eba-core").
export const getInstituteEnrollments = webMethod(
    Permissions.SiteMember,
    async (programId) => dbRequest("GET", `/institute/enrollments?program=${programId}`)
);

// Saves or updates a student's progress record.
export const saveStudentProgress = webMethod(
    Permissions.SiteMember,
    async (progress) => dbRequest("POST", "/institute/progress", progress)
);

// Returns the full curriculum for a program.
export const getCurriculum = webMethod(
    Permissions.Anyone,
    async (programId) => dbRequest("GET", `/institute/curriculum/${programId}`)
);

// ── Ambitiously By BoBo ───────────────────────────────────────────────────────

// Returns product catalogue with optional category filter.
export const getByBoBoProducts = webMethod(
    Permissions.Anyone,
    async (category) => {
        const qs = category ? `?category=${encodeURIComponent(category)}` : "";
        return dbRequest("GET", `/bybobo/products${qs}`);
    }
);

// Saves a SKI (personalised skin assessment) submission.
export const saveSKIAssessment = webMethod(
    Permissions.Anyone,
    async (assessment) => dbRequest("POST", "/bybobo/ski-assessments", assessment)
);

// Returns a client's previous SKI assessments (requires member auth).
export const getClientAssessments = webMethod(
    Permissions.SiteMember,
    async (clientEmail) =>
        dbRequest("GET", `/bybobo/ski-assessments?email=${encodeURIComponent(clientEmail)}`)
);

// ── Shared ────────────────────────────────────────────────────────────────────

// Upserts a contact in the shared CRM table.
export const upsertContact = webMethod(
    Permissions.SiteMember,
    async (contact) => dbRequest("POST", "/contacts", contact)
);

// Returns combined analytics for both brands (owner only).
export const getAnalytics = webMethod(
    Permissions.SiteOwner,
    async (dateRange) => dbRequest("POST", "/analytics", dateRange)
);
