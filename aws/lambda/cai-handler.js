// C-Ai AWS Lambda handler — deployed behind API Gateway.
// Processes AI requests from the Wix frontend via cai.web.js.
//
// Environment variables (set in Lambda console / SSM):
//   ANTHROPIC_API_KEY  — Claude API key
//   CLAUDE_MODEL       — model ID, e.g. claude-sonnet-4-6
//   ALLOWED_ORIGIN     — CORS origin for the Wix site (e.g. https://ambitiouslyinstitute.com)

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type,x-api-key",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
};

const INSTITUTE_SYSTEM = `You are C-Ai, the AI assistant for Ambitiously Institute —
an executive education platform for beauty professionals founded by Conrad St. Denis.

You help beauty professionals with:
- Consultation scripts and language frameworks
- Skincare ingredient knowledge and client education
- Business systems: pricing, retail authority, treatment protocols
- Program guidance for EBOS, Revenue Architecture, and Territory Strategy

Always respond with structured, authoritative language that reflects the Institute's
philosophy: education closes, structure converts, authority without arrogance.
Keep responses practical and actionable.`;

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: CORS_HEADERS, body: "" };
    }

    let body;
    try {
        body = JSON.parse(event.body || "{}");
    } catch {
        return error(400, "Invalid JSON body");
    }

    const path = event.path || event.rawPath || "/ask";

    try {
        if (path.endsWith("/ask")) return await handleAsk(body);
        if (path.endsWith("/recommend")) return await handleRecommend(body);
        if (path.endsWith("/score-script")) return await handleScoreScript(body);
        return error(404, "Unknown route");
    } catch (err) {
        console.error("C-Ai handler error:", err);
        return error(500, "Internal error");
    }
};

// POST /ask — free-form question
async function handleAsk({ question, context = {} }) {
    if (!question?.trim()) return error(400, "question is required");

    const contextNote = context.role
        ? `\n\nUser context: role=${context.role}, page=${context.page || "unknown"}.`
        : "";

    const message = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: INSTITUTE_SYSTEM + contextNote,
        messages: [{ role: "user", content: question }],
    });

    return ok({ answer: message.content[0].text, usage: message.usage });
}

// POST /recommend — personalised program/product recommendations
async function handleRecommend({ profile = {} }) {
    const profileSummary = JSON.stringify(profile, null, 2);

    const message = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: INSTITUTE_SYSTEM,
        messages: [
            {
                role: "user",
                content: `Based on this client profile, recommend the most suitable
Ambitiously Institute program and any relevant By BoBo products. Be specific.

Profile:
${profileSummary}`,
            },
        ],
    });

    return ok({ recommendations: message.content[0].text, usage: message.usage });
}

// POST /score-script — consultation script evaluation
async function handleScoreScript({ script }) {
    if (!script?.trim()) return error(400, "script is required");

    const message = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: INSTITUTE_SYSTEM,
        messages: [
            {
                role: "user",
                content: `Evaluate the following consultation script using the Institute's
3-Part Framework (Authority, Education, Close). Score each part out of 10 and provide
specific, actionable improvement suggestions.

Script:
${script}`,
            },
        ],
    });

    return ok({ feedback: message.content[0].text, usage: message.usage });
}

function ok(data) {
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(data) };
}

function error(status, message) {
    return {
        statusCode: status,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: message }),
    };
}
