// A List Membership — Wix backend module for Ambitiously By BoBo.
// Covers the full skin flow: intake → intelligence → ingredients → formulation.
// Also manages membership status, ongoing skin tracking, and birthday discounts.
//
// Photo upload flow:
//   1. uploadSkinPhoto({ email, angle }) → returns { uploadUrl, s3Key }
//   2. Wix page does PUT to uploadUrl with photo file (direct S3, no Lambda proxy)
//   3. runSkinIntake({ photoKeys: { front, left, right, decolletage }, ... }) uses s3Keys
//
// Secrets required in Wix Secrets Manager:
//   CAI_API_URL — API Gateway base URL (same as Institute)
//   CAI_API_KEY — API Gateway key (same as Institute)
//   DB_API_URL  — same endpoint
//   DB_API_KEY  — same key

import { Permissions, webMethod } from "wix-web-module";
import { assertOwnEmail } from "backend/auth-utils";
import { caiPost, dbRequest } from "backend/api-client";

// ── Photo upload ──────────────────────────────────────────────────────────────
// Returns a presigned S3 PUT URL. The Wix page then uploads the photo directly
// to S3 using a browser fetch PUT — no binary data through Lambda or Wix backend.
// angle: "front" | "left" | "right" | "decolletage"
export const uploadSkinPhoto = webMethod(
    Permissions.SiteMember,
    async ({ email, angle, contentType = "image/jpeg" }) =>
        dbRequest("POST", "/alist/photo-upload", { email, angle, contentType })
);

// ── Step 1: AI Skin Intake ────────────────────────────────────────────────────
// Accepts EITHER:
//   photoKeys: { front, left, right, decolletage } — S3 keys from uploadSkinPhoto
//   photos:    { front, left, right, decolletage } — inline base64 data URIs (fallback)
// Plus: environment: {climate, humidity, uvIndex},
//       sensory: {tightness, sensitivity, oiliness, texture},
//       history: {treatments, allergies, medications, pregnancyNursing}
export const runSkinIntake = webMethod(
    Permissions.Anyone,
    async (intake) => caiPost("/alist/skin-intake", { intake })
);

// ── Step 2: Skin Intelligence Mapping ────────────────────────────────────────
export const mapSkinIntelligence = webMethod(
    Permissions.Anyone,
    async (intakeSummary) => caiPost("/alist/skin-intelligence", { profile: intakeSummary })
);

// ── Step 3: Ingredient Education ─────────────────────────────────────────────
// goals: e.g. ["clear acne", "reduce fine lines", "even tone"]
// sourcing: e.g. ["organic", "vegan", "cruelty-free"] — filters/annotates ingredient picks
export const getIngredientEducation = webMethod(
    Permissions.Anyone,
    async (skinMap, goals, sourcing = []) => caiPost("/alist/ingredients", { skinMap, goals, sourcing })
);

// ── Step 4: Custom Formulation ────────────────────────────────────────────────
// productType: "serum" | "moisturiser" | "toner" | "cleanser" | "treatment"
export const buildFormulation = webMethod(
    Permissions.Anyone,
    async (skinMap, selectedIngredients, productType, preferences) =>
        caiPost("/alist/formulate", { skinMap, selectedIngredients, productType, preferences })
);

// ── Consumer A List membership ────────────────────────────────────────────────
// Retail products + services: 10% off always, 30% birthday (day-of),
// personalized formulation, ongoing skin tracking, priority product access.

export const joinAList = webMethod(
    Permissions.SiteMember,
    async (memberData) => dbRequest("POST", "/alist/members", memberData)
);

export const getAListProfile = webMethod(
    Permissions.SiteMember,
    async (email) => {
        await assertOwnEmail(email);
        return dbRequest("GET", `/alist/members?email=${encodeURIComponent(email)}`);
    }
);

// ── Professional A-List membership ───────────────────────────────────────────
// Professional treatment products at wholesale pricing.
// Requires professional license number OR proof of Institute EBOS completion.
// Benefits: 30% wholesale on treatment products, 20% birthday bonus,
//           access to pro-only formulations and product lines.

export const joinAListPro = webMethod(
    Permissions.SiteMember,
    async (proData) => dbRequest("POST", "/alist/pro/members", proData)
);

export const getAListProProfile = webMethod(
    Permissions.SiteMember,
    async (email) => {
        await assertOwnEmail(email);
        return dbRequest("GET", `/alist/pro/members?email=${encodeURIComponent(email)}`);
    }
);

// Returns professional treatment products (wholesale, pro-only lines)
export const getProProducts = webMethod(
    Permissions.SiteMember,
    async (category) => {
        const qs = category ? `?category=${encodeURIComponent(category)}` : "";
        return dbRequest("GET", `/alist/pro/products${qs}`);
    }
);

// ── Skin tracking (both tiers) ────────────────────────────────────────────────

export const logSkinCheckIn = webMethod(
    Permissions.SiteMember,
    async (trackingData) => dbRequest("POST", "/alist/skin-tracking", trackingData)
);

export const getSkinHistory = webMethod(
    Permissions.SiteMember,
    async (email) => {
        await assertOwnEmail(email);
        return dbRequest("GET", `/alist/skin-tracking?email=${encodeURIComponent(email)}`);
    }
);

// ── Discounts ─────────────────────────────────────────────────────────────────
// tier: "consumer" (default) | "professional"

export const getActiveDiscount = webMethod(
    Permissions.SiteMember,
    async (email, tier = "consumer") => {
        await assertOwnEmail(email);
        return dbRequest("GET", `/alist/discount?email=${encodeURIComponent(email)}&tier=${tier}`);
    }
);

// ── Referrals ──────────────────────────────────────────────────────────────────
// Viral loop: member submits up to 5 friend emails → friends enter funnel →
// referral credited when friend joins → credit toward free products.
// referredEmails: string[] — up to 5 email addresses

export const saveReferrals = webMethod(
    Permissions.SiteMember,
    async (referrerEmail, referredEmails) =>
        dbRequest("POST", "/alist/referrals", { referrerEmail, referredEmails })
);

export const getReferralStats = webMethod(
    Permissions.SiteMember,
    async (email) => {
        await assertOwnEmail(email);
        return dbRequest("GET", `/alist/referrals?email=${encodeURIComponent(email)}`);
    }
);

// ── Ingredient encyclopedia ────────────────────────────────────────────────────
// Public: education-first browsable library of all By BoBo ingredients.

export const getIngredientLibrary = webMethod(
    Permissions.Anyone,
    async ({ category, sourcing, skinType, search, limit = 50 } = {}) => {
        const qs = new URLSearchParams();
        if (category) qs.set("category", category);
        if (sourcing) qs.set("sourcing", sourcing);
        if (skinType) qs.set("skinType", skinType);
        if (search)   qs.set("search", search);
        qs.set("limit", String(limit));
        return dbRequest("GET", `/bybobo/encyclopedia?${qs}`);
    }
);

export const getIngredientDetail = webMethod(
    Permissions.Anyone,
    async (slug) => dbRequest("GET", `/bybobo/encyclopedia/${encodeURIComponent(slug)}`)
);
