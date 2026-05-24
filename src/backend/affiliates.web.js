// Affiliate Program — grad army referral network for Ambitiously By BoBo.
// Institute graduates receive a unique trackable affiliate link; they earn 10%
// commission on every sale they refer. All tracking goes through the DB Lambda.
//
// Secrets required in Wix Secrets Manager:
//   DB_API_URL — AWS API Gateway base URL
//   DB_API_KEY — API key

import { Permissions, webMethod } from "wix-web-module";
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

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
    if (!res.ok) throw new Error(`Affiliates DB error ${res.status} on ${path}`);
    return res.json();
}

// Creates (or retrieves) the affiliate account for a verified Institute graduate.
// Returns { affiliateCode, affiliateLink, commissionPct, status }
// graduateVerified must be confirmed server-side via Institute enrollment records.
export const createOrGetAffiliateLink = webMethod(
    Permissions.SiteMember,
    async (email, displayName) =>
        dbRequest("POST", "/affiliates", {
            email,
            displayName,
            commissionPct: 10,
            createdAt: new Date().toISOString(),
        })
);

// Logs a click on an affiliate link (called from the public storefront landing).
// affiliateCode: the short code embedded in the referral URL
export const trackAffiliateClick = webMethod(
    Permissions.Anyone,
    async (affiliateCode, referringUrl) =>
        dbRequest("POST", "/affiliates/click", {
            affiliateCode,
            referringUrl,
            clickedAt: new Date().toISOString(),
        })
);

// Records a completed conversion attributed to an affiliate.
// Called after a successful Stripe payment webhook is processed by the DB Lambda.
// purchaseAmount is the pre-tax CAD order total.
export const trackAffiliateConversion = webMethod(
    Permissions.SiteMember,
    async (affiliateCode, purchaseAmount, orderId) =>
        dbRequest("POST", "/affiliates/conversion", {
            affiliateCode,
            purchaseAmount: Number(purchaseAmount),
            commissionEarned: Number(purchaseAmount) * 0.1,
            orderId,
            convertedAt: new Date().toISOString(),
        })
);

// Returns a full affiliate earnings dashboard for the authenticated member.
// { affiliateCode, affiliateLink, totalClicks, totalConversions,
//   totalEarnings, pendingPayout, conversions: [...] }
export const getAffiliateDashboard = webMethod(
    Permissions.SiteMember,
    async (email) =>
        dbRequest("GET", `/affiliates/dashboard?email=${encodeURIComponent(email)}`)
);

// Returns paginated conversion history for a given affiliate.
export const getAffiliateConversions = webMethod(
    Permissions.SiteMember,
    async (email, page = 1, pageSize = 20) =>
        dbRequest(
            "GET",
            `/affiliates/conversions?email=${encodeURIComponent(email)}&page=${page}&pageSize=${pageSize}`
        )
);
