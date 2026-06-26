// Shared HTTP client for the AWS API Gateway endpoints (C-Ai and the data API).
// Both endpoints sit behind the same x-api-key auth pattern — this consolidates
// the three near-identical fetch wrappers previously duplicated across
// alist.web.js, cai.web.js, and database.web.js.

import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

async function apiRequest({ urlSecret, keySecret, method, path, body, errorPrefix }) {
    const [url, key] = await Promise.all([
        getSecret(urlSecret),
        getSecret(keySecret),
    ]);

    const options = {
        method,
        headers: { "Content-Type": "application/json", "x-api-key": key },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        const detail = await response.text().catch(() => response.status);
        throw new Error(`${errorPrefix} (${response.status}) on ${path}: ${detail}`);
    }

    return response.json();
}

export const caiPost = (path, body) =>
    apiRequest({ urlSecret: "CAI_API_URL", keySecret: "CAI_API_KEY", method: "POST", path, body, errorPrefix: "C-Ai error" });

export const dbRequest = (method, path, body) =>
    apiRequest({ urlSecret: "DB_API_URL", keySecret: "DB_API_KEY", method, path, body, errorPrefix: "DB error" });
