// Shared database layer for Ambitiously Institute and Ambitiously By BoBo.
// Routes queries to the AWS API Gateway data endpoint.
// Secrets required in Wix Secrets Manager:
//   DB_API_URL — base URL of the AWS data API (e.g. API Gateway + Lambda/RDS Proxy)
//   DB_API_KEY — API key for the data endpoint

import { Permissions, webMethod } from "wix-web-module";
import { assertOwnEmail } from "backend/auth-utils";
import { dbRequest } from "backend/api-client";

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
    async (clientEmail) => {
        await assertOwnEmail(clientEmail);
        return dbRequest("GET", `/bybobo/ski-assessments?email=${encodeURIComponent(clientEmail)}`);
    }
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
