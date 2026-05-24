// Cross-brand ecosystem integration — bridges Ambitiously Institute and Ambitiously By BoBo.
// Powers student-to-store funnels, dual AI recommendations, ingredient-product links,
// grad perks, and the B2B Pro Membership tier.
//
// Secrets required in Wix Secrets Manager:
//   CAI_API_URL  — AWS API Gateway base URL
//   CAI_API_KEY  — API key for the gateway
//   DB_API_URL   — same endpoint (reused)
//   DB_API_KEY   — same key

import { Permissions, webMethod } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

async function caiPost(path, body) {
    const [url, key] = await Promise.all([
        getSecret("CAI_API_URL"),
        getSecret("CAI_API_KEY"),
    ]);
    const res = await fetch(`${url}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`C-Ai error ${res.status} on ${path}`);
    return res.json();
}

async function dbRequest(method, path, body) {
    const [url, key] = await Promise.all([
        getSecret("DB_API_URL"),
        getSecret("DB_API_KEY"),
    ]);
    const opts = {
        method,
        headers: { "Content-Type": "application/json", "x-api-key": key },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${url}${path}`, opts);
    if (!res.ok) throw new Error(`DB error ${res.status} on ${path}`);
    return res.json();
}

// ── Student Kit Bundles ───────────────────────────────────────────────────────
// Returns the curated product kit for a given Institute program.
// programId: "ebos" | "revenue-architecture" | "territory-strategy"
export const getStudentKitBundle = webMethod(
    Permissions.Anyone,
    async (programId) => {
        const qs = programId ? `?programId=${encodeURIComponent(programId)}` : "";
        return dbRequest("GET", `/ecosystem/student-kit${qs}`);
    }
);

// ── Dual AI Recommendation (Skin AI → Product + Course) ───────────────────────
// After a Skin AI assessment, returns both a product recommendation (buy it)
// and a course recommendation (learn how to treat it professionally).
// skinProfile: { skinType, concerns, goals, budget }
export const getSkinAIDualRecommendation = webMethod(
    Permissions.Anyone,
    async (skinProfile) => caiPost("/ecosystem/dual-recommend", { skinProfile })
);

// ── Course Progress Coupon ────────────────────────────────────────────────────
// Issue a mid-course discount coupon when a student hits the 50% milestone.
// Automatically called by the lesson completion handler.
// progressPct: 0-100
export const issueCourseProgressCoupon = webMethod(
    Permissions.SiteMember,
    async (email, programId, progressPct) =>
        dbRequest("POST", "/ecosystem/progress-coupon", { email, programId, progressPct })
);

// ── Grad Perks ────────────────────────────────────────────────────────────────
// Returns the permanent grad discount code (15% off C-Ai Cosmetics for life)
// and initialises their affiliate account if not yet created.
export const getGradPerks = webMethod(
    Permissions.SiteMember,
    async (email) => dbRequest("GET", `/ecosystem/grad-perks?email=${encodeURIComponent(email)}`)
);

// ── Ingredient → Product Bridge ───────────────────────────────────────────────
// Given an ingredient slug (from the encyclopedia), returns ByBoBo products
// that contain it — powering the "Shop Products with This Ingredient" button.
export const getIngredientProducts = webMethod(
    Permissions.Anyone,
    async (ingredientSlug) =>
        dbRequest("GET", `/ecosystem/ingredient-products?ingredient=${encodeURIComponent(ingredientSlug)}`)
);

// ── B2B Pro Membership Tiers ──────────────────────────────────────────────────
// Returns the available recurring Pro Membership subscription tiers.
// Used on the A-List / Plans pages to render the professional pricing cards.
export const getProMembershipTiers = webMethod(
    Permissions.Anyone,
    async () => dbRequest("GET", "/ecosystem/pro-tiers")
);

// Enrolls a member in a B2B Pro Membership recurring subscription.
// tierId: "pro-lite" ($49 CAD/mo) | "pro-standard" ($79 CAD/mo) | "pro-elite" ($99 CAD/mo)
export const enrollProMembership = webMethod(
    Permissions.SiteMember,
    async (email, tierId) =>
        dbRequest("POST", "/ecosystem/pro-enroll", { email, tierId })
);

// ── Skin AI Tier Definitions ──────────────────────────────────────────────────
// Returns the three C-Ai consultation tiers (Bronze / Silver / Gold) used to
// render the pricing cards on the Skin AI page.
export const getSkinAITiers = webMethod(
    Permissions.Anyone,
    async () => ({
        tiers: [
            {
                id: "bronze",
                name: "Bronze",
                priceCad: 79,
                headline: "Simple Skin Blueprint",
                description: "AI-generated skin profile + top 3 product recommendations.",
                cta: "Start My Blueprint",
                checkoutUrl: "/checkout?tier=bronze&product=cai-consult-bronze",
            },
            {
                id: "silver",
                name: "Silver",
                priceCad: 149,
                headline: "AI Consult + Booster Kit",
                description: "Full diagnostic + FutureCode Booster Kit shipped to your door.",
                popular: true,
                cta: "Claim My Silver Kit",
                checkoutUrl: "/checkout?tier=silver&product=cai-consult-silver",
            },
            {
                id: "gold",
                name: "Gold",
                priceCad: 249,
                headline: "Complete Glow System",
                description: "Comprehensive AI consultation + full-size Glow System bundle.",
                cta: "Build My Glow System",
                checkoutUrl: "/checkout?tier=gold&product=cai-consult-gold",
            },
        ],
    })
);
