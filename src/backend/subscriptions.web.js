// Subscribe & Save — product subscription management for Ambitiously By BoBo.
// Creates and manages recurring auto-replenishment subscriptions (30 / 60 / 90 day)
// with a 10% discount applied at the time of each renewal order.
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
    if (!res.ok) throw new Error(`Subscriptions DB error ${res.status} on ${path}`);
    return res.json();
}

// Enrol a member in a Subscribe & Save plan for a specific product.
// intervalDays: 30 | 60 | 90
// Returns the new subscription record including subscriptionId and nextRenewalDate.
export const createProductSubscription = webMethod(
    Permissions.SiteMember,
    async (email, productId, intervalDays) => {
        const validIntervals = [30, 60, 90];
        if (!validIntervals.includes(Number(intervalDays))) {
            throw new Error("intervalDays must be 30, 60, or 90");
        }
        return dbRequest("POST", "/subscriptions", {
            email,
            productId,
            intervalDays: Number(intervalDays),
            discountPct: 10,
            createdAt: new Date().toISOString(),
        });
    }
);

// Returns all active Subscribe & Save subscriptions for a member.
export const getProductSubscriptions = webMethod(
    Permissions.SiteMember,
    async (email) =>
        dbRequest("GET", `/subscriptions?email=${encodeURIComponent(email)}`)
);

// Cancels a specific subscription. The member retains their current order.
export const cancelProductSubscription = webMethod(
    Permissions.SiteMember,
    async (email, subscriptionId) =>
        dbRequest("POST", "/subscriptions/cancel", {
            email,
            subscriptionId,
            cancelledAt: new Date().toISOString(),
        })
);

// Updates the delivery interval for an existing subscription.
// intervalDays: 30 | 60 | 90
export const updateSubscriptionInterval = webMethod(
    Permissions.SiteMember,
    async (email, subscriptionId, intervalDays) => {
        const validIntervals = [30, 60, 90];
        if (!validIntervals.includes(Number(intervalDays))) {
            throw new Error("intervalDays must be 30, 60, or 90");
        }
        return dbRequest("POST", "/subscriptions/update-interval", {
            email,
            subscriptionId,
            intervalDays: Number(intervalDays),
            updatedAt: new Date().toISOString(),
        });
    }
);

// Sends a 3-day pre-renewal reminder for all subscriptions renewing soon.
// Called by a scheduled Wix Automation (trigger: daily cron) or Wix HTTP function.
// Generates the upsell "add on an extra serum" email via the DB Lambda, which
// queues the message through Wix Triggered Emails or an SES template.
export const triggerRenewalReminders = webMethod(
    Permissions.SiteOwner,
    async () => dbRequest("POST", "/subscriptions/send-renewal-reminders", {
        daysAhead: 3,
        triggeredAt: new Date().toISOString(),
    })
);

// Returns the available Subscribe & Save interval options for UI rendering.
export const getSubscriptionIntervalOptions = webMethod(
    Permissions.Anyone,
    async () => ({
        options: [
            { days: 30, label: "Every 30 Days", badge: "Most Popular" },
            { days: 60, label: "Every 60 Days", badge: null },
            { days: 90, label: "Every 90 Days", badge: "Best Value" },
        ],
        discountPct: 10,
    })
);
