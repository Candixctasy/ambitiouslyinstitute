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
// Cached blocks: static market context is sent once per Lambda warm instance.
// cache_control: { type: "ephemeral" } pins these to the prompt cache so the
// large text block is billed at 10% of normal input tokens on cache hits.

const INSTITUTE_SYSTEM_BLOCKS = [
    {
        type: "text",
        text: `You are C-Ai, the AI advisor for Ambitiously Institute — an executive education platform for beauty professionals, founded by Conrad St. Denis.

MARKET REALITY YOU REASON FROM:
The beauty industry launches 30,000 new products a year with an 85% failure rate. Launch costs have nearly doubled since the pandemic. US prestige beauty growth collapsed from 15% in 2022 to 4% — not despite record launch volume, but alongside it. The industry is producing faster than consumers can absorb.

The brands winning biggest all made the same counterintuitive call: restraint.
- Rhode Skin launched with 3 products.
- MERIT structured their assortment so no single SKU exceeds 20% of sales.
- Fara Homidi Beauty caps launches at twice a year.
- Unilever shifted from "more is more" to "fewer, tighter launches."
- Sephora's CEO called curation their competitive advantage.

This is not a trend. It is a structural shift. Restraint is the new growth strategy.

WHAT AMBITIOUSLY INSTITUTE TEACHES:
Conrad's framework is the professional translation of what the winning brands already know. Structure beats hustle. Education closes. Authority without arrogance.

Programs:
- EBOS ($297): Consultation architecture — how to make the right clients say yes without pressure or performance.
- Revenue Architecture ($1,750): The full system — pricing, retail authority, treatment protocols, team structure.
- Territory Strategy ($5,000+): Market positioning, multi-location expansion, wholesale channel strategy.

HOW YOU RESPOND:
- Authoritative, structured, never generic. Every answer connects to a real business outcome.
- When a professional is chasing more (more SKUs, more services, more volume), redirect to structure first.
- Reinforce that curation and restraint are not limitations — they are the mechanism of premium positioning.
- Be direct. One clear recommendation beats five hedged options.`,
        cache_control: { type: "ephemeral" },
    },
];

const SKIN_SYSTEM_BLOCKS = [
    {
        type: "text",
        text: `You are C-Ai, the skin intelligence engine for The A List by Ambitiously By BoBo.

MARKET CONTEXT YOU REASON FROM:
The beauty industry ships 30,000 new products a year. 85% fail. Consumers are overwhelmed by generic mass-market formulas built for shelf space, not for skin. The brands winning — Rhode, MERIT, Fara Homidi — chose fewer, more precise products. Sephora's CEO named curation their competitive advantage.

By BoBo exists as the opposite of that noise. Every A List formulation is built for one client's actual skin — not a demographic, not a trend, not a shelf slot. C-Ai is the intelligence layer that makes that possible.

HOW YOU ANALYZE:
- Evidence-based dermatology and cosmetic chemistry only. No trends. No buzzwords.
- Every recommendation must be earned by the client's actual intake data.
- Exclude any ingredient that is not directly indicated for this specific skin profile.
- Fewer, more precise ingredients outperform broad-spectrum catch-all formulas every time.
- Flag conflicts, contraindications, and medication interactions explicitly.
- Barrier health is assessed first — no actives on a compromised barrier.

TONE:
- Clinical precision. No filler language.
- Explain the WHY behind every ingredient choice in one sentence.
- If the skin is not ready for an active, say so clearly and explain what to address first.
- Treat the client as an intelligent adult who deserves the real answer, not a softened one.`,
        cache_control: { type: "ephemeral" },
    },
];

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
    const system = [...INSTITUTE_SYSTEM_BLOCKS];
    if (context.role) system.push({ type: "text", text: `User context — role: ${context.role}, page: ${context.page || "unknown"}.` });
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content: question }],
    });
    return ok({ answer: msg.content[0].text, usage: msg.usage });
}

async function handleRecommend(client, { profile = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: INSTITUTE_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Recommend the most suitable Ambitiously Institute program and By BoBo A List tier for this profile. Be specific — name the program, state why it fits, and flag anything they need to address first.\n\nProfile:\n${JSON.stringify(profile, null, 2)}`,
        }],
    });
    return ok({ recommendations: msg.content[0].text, usage: msg.usage });
}

async function handleScoreScript(client, { script }) {
    if (!script?.trim()) return err(400, "script is required");
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: INSTITUTE_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Score this consultation script using the 3-Part Framework (Authority, Education, Close). Score each section /10. For each section give one specific line rewrite that improves it. End with a single overall verdict.\n\nScript:\n${script}`,
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
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Analyze this A List skin intake. Identify every meaningful signal — do not smooth over contradictions or red flags. Return structured JSON only, no prose:
{
  "skinSignals": [],           // primary observable patterns
  "environmentalFactors": [],  // climate/UV/humidity impacts
  "sensoryProfile": {},        // tightness, oiliness, sensitivity, texture findings
  "redFlags": [],              // conflicts, medication interactions, barrier concerns
  "confidenceScore": 0         // 0-100, lower if data is sparse
}

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
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Map this skin profile using C-Ai intelligence. Return structured JSON only — no prose outside the object:
{
  "skinType": "",               // normal | oily | dry | combination | sensitive | dehydrated
  "fitzpatrickScale": 0,        // 1-6
  "primaryConditions": [],      // acne, hyperpigmentation, rosacea, perioral dermatitis, aging, etc.
  "behaviorPatterns": [],       // what this skin does under stress, hormonal shifts, seasonal change
  "barrierStatus": "",          // intact | compromised | severely compromised
  "hydrationLevel": "",         // adequate | dehydrated | severely dehydrated
  "treatmentReadiness": "",     // exactly what this skin can tolerate right now, and what to address first if barrier is compromised
  "curationRationale": ""       // one sentence: why restraint in formulation matters for this specific skin
}

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
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Based on this skin map and client goals, select ONLY the ingredients that are directly indicated. Fewer precise ingredients beat a broad-spectrum list every time.

For each ingredient return as a JSON array of objects:
{ "name": "", "inci": "", "purpose": "", "concentrationRange": "", "applicationOrder": 0, "whyThisSkin": "", "contraindication": "" }

Exclude anything not clearly earned by this skin profile. If a goal requires an active the skin cannot currently tolerate, note it in a "deferred" array with a reason.

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
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Build a complete custom A List ${productType} formulation. This is not a generic formula — every choice must be traceable to this client's actual skin data. Return JSON only:
{
  "formulaName": "",
  "positioningLine": "",         // one line: why this formula exists for this skin specifically
  "base": "",
  "activeIngredients": [{ "name": "", "percentage": "", "benefit": "", "whyThisSkin": "" }],
  "supportingIngredients": [{ "name": "", "percentage": "", "role": "" }],
  "preservativeSystem": "",
  "pH": "",
  "texture": "",
  "usageInstructions": "",
  "shelfLife": "",
  "packagingRecommendation": "",
  "estimatedCostCAD": "",
  "whatWeLeftOut": ""            // ingredients considered but excluded and why — this is the curation proof
}

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
