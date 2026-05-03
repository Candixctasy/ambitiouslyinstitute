// C-Ai AWS Lambda handler — ca-central-1
// Serves both Ambitiously Institute (consultation/education AI) and
// By BoBo A List (skin intelligence: intake → mapping → ingredients → formulation).
//
// Secrets Manager secret: ambitiously/anthropic-api-key
// Env vars set by SAM: CLAUDE_MODEL, ALLOWED_ORIGIN, ANTHROPIC_SECRET_NAME

import Anthropic from "@anthropic-ai/sdk";
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secrets = new SecretsManagerClient({ region: "ca-central-1" });
let _anthropicKey = null;

async function getAnthropicKey() {
    if (_anthropicKey) return _anthropicKey;
    const res = await secrets.send(
        new GetSecretValueCommand({ SecretId: process.env.ANTHROPIC_SECRET_NAME })
    );
    _anthropicKey = res.SecretString;
    return _anthropicKey;
}

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const CORS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type,x-api-key",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
};

// ── System prompts ────────────────────────────────────────────────────────────

const INSTITUTE_SYSTEM = `You are C-Ai, the AI assistant for Ambitiously Institute —
an executive education platform for beauty professionals founded by Conrad St. Denis.
You help beauty professionals with consultation scripts, skincare ingredient knowledge,
business systems (pricing, retail authority, treatment protocols), and program guidance
(EBOS, Revenue Architecture, Territory Strategy).
Respond with structured, authoritative language. Education closes, structure converts,
authority without arrogance. Be practical and actionable.`;

const SKIN_SYSTEM = `You are C-Ai, the skin intelligence engine for The A List by
Ambitiously By BoBo. You analyze skin using evidence-based dermatology and cosmetic
chemistry. You are precise, professional, and never recommend irrelevant ingredients.
Every output must be specific to the client's actual skin data — not generic.`;

// ── Handler ───────────────────────────────────────────────────────────────────

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: CORS, body: "" };
    }

    let body = {};
    try {
        if (event.body) body = JSON.parse(event.body);
    } catch {
        return err(400, "Invalid JSON body");
    }

    const path = event.path || event.rawPath || "/";
    const key = await getAnthropicKey();
    const client = new Anthropic({ apiKey: key });

    try {
        // Institute routes
        if (path.endsWith("/ask")) return await handleAsk(client, body);
        if (path.endsWith("/recommend")) return await handleRecommend(client, body);
        if (path.endsWith("/score-script")) return await handleScoreScript(client, body);

        // A List skin flow routes
        if (path.endsWith("/alist/skin-intake")) return await handleSkinIntake(client, body);
        if (path.endsWith("/alist/skin-intelligence")) return await handleSkinIntelligence(client, body);
        if (path.endsWith("/alist/ingredients")) return await handleIngredients(client, body);
        if (path.endsWith("/alist/formulate")) return await handleFormulate(client, body);

        return err(404, "Unknown route");
    } catch (e) {
        console.error("C-Ai error:", e);
        return err(500, "Internal error");
    }
};

// ── Institute routes ──────────────────────────────────────────────────────────

async function handleAsk(client, { question, context = {} }) {
    if (!question?.trim()) return err(400, "question is required");
    const note = context.role ? `\nUser: role=${context.role}, page=${context.page}.` : "";
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: INSTITUTE_SYSTEM + note,
        messages: [{ role: "user", content: question }],
    });
    return ok({ answer: msg.content[0].text, usage: msg.usage });
}

async function handleRecommend(client, { profile = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: INSTITUTE_SYSTEM,
        messages: [{
            role: "user",
            content: `Recommend the most suitable Ambitiously Institute program and By BoBo A List products for this profile. Be specific.\n\nProfile:\n${JSON.stringify(profile, null, 2)}`,
        }],
    });
    return ok({ recommendations: msg.content[0].text, usage: msg.usage });
}

async function handleScoreScript(client, { script }) {
    if (!script?.trim()) return err(400, "script is required");
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: INSTITUTE_SYSTEM,
        messages: [{
            role: "user",
            content: `Score this consultation script using the 3-Part Framework (Authority, Education, Close). Score each /10 and give specific improvements.\n\nScript:\n${script}`,
        }],
    });
    return ok({ feedback: msg.content[0].text, usage: msg.usage });
}

// ── A List skin flow ──────────────────────────────────────────────────────────

// Step 1: AI Skin Intake
// intake: { photos: {front, left, right}, environment: {climate, humidity, uvIndex},
//           sensory: {tightness, sensitivity, oiliness, texture}, history: {...} }
async function handleSkinIntake(client, { intake = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SKIN_SYSTEM,
        messages: [{
            role: "user",
            content: `Analyze this skin intake data. Identify the primary skin signals from environmental triggers, sensory check, and history. Return a structured JSON summary with fields: skinSignals (array), environmentalFactors (array), sensoryProfile (object), redFlags (array), confidenceScore (0-100).

Intake data:
${JSON.stringify(intake, null, 2)}`,
        }],
    });
    return ok({ intakeSummary: msg.content[0].text, usage: msg.usage });
}

// Step 2: Skin Intelligence Mapping
// profile: the intakeSummary from step 1
async function handleSkinIntelligence(client, { profile = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: SKIN_SYSTEM,
        messages: [{
            role: "user",
            content: `Map this skin profile using C-Ai intelligence. Return structured JSON with:
- skinType (one of: normal, oily, dry, combination, sensitive, dehydrated)
- fitzpatrickScale (1-6)
- primaryConditions (array, e.g. acne, hyperpigmentation, rosacea, aging)
- behaviorPatterns (array: what the skin does under stress/seasons/hormones)
- barrierStatus (intact, compromised, severely compromised)
- hydrationLevel (adequate, dehydrated, severely dehydrated)
- treatmentReadiness (what treatments the skin can currently tolerate)

Skin profile:
${JSON.stringify(profile, null, 2)}`,
        }],
    });
    return ok({ skinMap: msg.content[0].text, usage: msg.usage });
}

// Step 3: Ingredient Education
// skinMap: result from step 2, goals: array of client goals
async function handleIngredients(client, { skinMap = {}, goals = [] }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: SKIN_SYSTEM,
        messages: [{
            role: "user",
            content: `Based on this skin map and client goals, identify ONLY the suitable ingredients.
For each ingredient return: name, purpose, concentration range, order of application, and one contraindication to watch for.
Exclude anything irrelevant to this skin. Return as JSON array.

Skin map:
${JSON.stringify(skinMap, null, 2)}

Client goals: ${goals.join(", ")}`,
        }],
    });
    return ok({ ingredients: msg.content[0].text, usage: msg.usage });
}

// Step 4: Custom Formulation
// skinMap, selectedIngredients, productType, preferences
async function handleFormulate(client, { skinMap = {}, selectedIngredients = [], productType, preferences = {} }) {
    if (!productType) return err(400, "productType is required");
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 2000,
        system: SKIN_SYSTEM,
        messages: [{
            role: "user",
            content: `Build a complete custom ${productType} formulation for this client.
Return JSON with: formulaName, base, activeIngredients (each with % and benefit),
supportingIngredients, preservativeSystem, pH, texture, usageInstructions,
shelfLife, packagingRecommendation, estimatedCost (CAD).

Skin map:
${JSON.stringify(skinMap, null, 2)}

Selected ingredients: ${selectedIngredients.join(", ")}
Client preferences: ${JSON.stringify(preferences)}`,
        }],
    });
    return ok({ formula: msg.content[0].text, usage: msg.usage });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ok(data) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify(data) };
}

function err(status, message) {
    return { statusCode: status, headers: CORS, body: JSON.stringify({ error: message }) };
}
