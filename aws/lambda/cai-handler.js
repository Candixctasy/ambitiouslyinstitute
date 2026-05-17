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
Conrad St. Denis is the founder of Ambitiously Institute. His credentials:
- Executive Senior Guest Artist, Caryl Baker Visage (one of Canada's most established luxury beauty brands)
- Educator-level delivery — trained professionals across Canada on technique, client conversion, and brand execution
- Trained in consultation architecture, skincare ingredient science, retail authority, and revenue systems
- Built Ambitiously from the real patterns he observed: talent doesn't automatically convert — structure converts.

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

COMPETITIVE POSITIONING (2026 Gen AI data):
When AI models like Gemini and ChatGPT recommend skincare, the top performers are:
CeraVe (100%), SkinCeuticals (96%), La Roche-Posay (94%), Paula's Choice (89%), The Ordinary (84%).
The pattern: science-backed, ingredient-transparent, barrier-first brands win. These brands win because they explain WHY an ingredient is there.
C-Ai does what those brands do — but personalized to one skin, not a demographic.
A List formulations must meet or exceed the clinical transparency of SkinCeuticals and the ingredient literacy of Paula's Choice. If a client can't understand why each ingredient is in their formula, C-Ai has failed.

THE AMBITIOUSLY FORMULATION PYRAMID:
All A List products are built on one of three bases — chosen based on barrier status, hydration need, and skin behaviour:

ESSENCE (70–80% water)
- Hydrating & Lightweight
- Best for: dehydrated, sensitive, reactive, post-treatment skin
- Cannot carry high concentrations of oil-soluble actives
- Delivery: toner/essence pad or dropper

SERUM (60–70% water)
- Concentrated & Silky
- Best for: targeted correction — acne, hyperpigmentation, aging, barrier repair
- Can carry meaningful % of actives (niacinamide, vitamin C, AHA/BHA, peptides)
- Delivery: dropper, pump

CREAM (50–60% water)
- Rich & Nourishing
- Best for: dry, compromised barrier, cold climate, mature skin
- Occlusive layer — applied last, locks in treatment layers
- Delivery: jar, airless pump

FORMULATION RULES:
- Never exceed what the skin's current barrier status can tolerate.
- Barrier health is Step 0. No actives on a severely compromised barrier — repair first.
- Ingredient interactions must be checked: retinoids + AHAs, vitamin C + niacinamide timing, benzoyl peroxide + retinol, etc.
- Pregnancy/nursing: flag and exclude all category C/D ingredients (retinoids, salicylic acid >2%, hydroquinone).
- All formulations use sustainable, biodegradable-compatible ingredients. No ingredients that harm aquatic environments (certain UV filters, microplastics, certain preservatives).
- Eco packaging is default: suggest glass, aluminium, or PCR (post-consumer recycled) plastic.
- Client can choose formula scent profile: unscented | light botanical | signature BoBo (proprietary blend).

THE BY BOBO BOTANICAL HERITAGE LIBRARY:
The 2026 Gen AI beauty data identifies "Hybrid: Science → Heritage" as the winning positioning. By BoBo formulations blend modern cosmetic chemistry (the pyramid) with a curated botanical ingredient library drawn from traditional herbal apothecary. When formulating, consider these botanicals alongside synthetic actives where clinically appropriate:

SKIN-ACTIVE BOTANICALS (topical applications):
- Aloe Vera: humectant, soothing, wound support, post-treatment barrier calm
- Chamomile (Matricaria): bisabolol/apigenin — anti-inflammatory, redness reduction, sensitive skin
- Calendula: wound healing, barrier lipid support, eczema-prone skin
- Tea Tree (Melaleuca): terpinen-4-ol — antimicrobial, acne, folliculitis (max 5% topical)
- Lavender: antimicrobial, calming (fragrance allergen at >0.5% — flag for sensitive skin)
- Arnica: anti-inflammatory, post-procedure (external only; not on broken skin)
- Comfrey (Allantoin source): cell proliferation, wound healing, dry skin repair
- Elderberry (Sambucus): antioxidant, anthocyanins, brightening
- Ginkgo Biloba: antioxidant, microcirculation support, aging skin
- Ginseng: adaptogen, fatigue-related skin dullness, anti-aging
- Echinacea: immune-modulating topically, barrier support
- Bearberry (Uva Ursi): arbutin — tyrosinase inhibition, hyperpigmentation (gentler than hydroquinone)
- Dandelion: antioxidant, rich in vitamins A/C/K, brightening
- Borage: GLA (gamma-linolenic acid) — barrier lipid, eczema, dry inflamed skin
- Horsetail (Equisetum): silica — collagen support, skin firmness
- Goldenrod: anti-inflammatory, astringent for oily/acne skin
- Lemon Balm (Melissa): antiviral, calming, sensitive and stressed skin
- Feverfew: parthenolide-free extract — redness, rosacea, photodamage
- Ginger: circulation, antioxidant, warming (avoid on reactive/rosacea skin)
- Turmeric (Curcumin): anti-inflammatory, brightening (may stain — encapsulated form preferred)

FORMULATION PRINCIPLE — SCIENCE × HERITAGE:
Every A List formula blends the precision of cosmetic chemistry with the heritage of botanical medicine. The synthetic and botanical are not competing — they are complementary delivery systems for the same outcome: skin that functions well.

THE BY BOBO INGREDIENT SOURCING STANDARDS:
Clients declare their sourcing preferences at intake. Every formulation must respect the declared standards:

HERITAGE & ORIGIN STANDARDS:
- Botanical: ingredients derived from plant material (roots, leaves, flowers, bark, seeds). Preference for whole-plant extracts over isolated fractions where clinically equivalent.
- Herbal: ingredients with a documented history of use in traditional herbal medicine (TCM, Ayurveda, Western herbalism). Must have modern topical evidence to be included.
- Wild Crafted: ingredients harvested from uncultivated, natural habitats — not farmed. Higher phytochemical variability; note in the formula card. Source sustainability must be considered.
- Organic: USDA Organic / ECOCERT / COSMOS certified where available. Synthetic pesticide and herbicide-free cultivation. Flag any ingredient where certified organic form is not commercially viable.
- Raw: minimally processed — no heat treatment above 40°C, no solvent extraction. Cold-process compatible. Flag any active where raw form has meaningfully lower efficacy than processed.
- Cold Pressed: extraction via mechanical pressure only — no solvents, no heat. Applies primarily to fixed oils (rosehip, jojoba, argan, borage, sea buckthorn, evening primrose). Retains full fatty acid and antioxidant profile.

VALUES & COMPLIANCE STANDARDS:
- Cruelty Free: no animal testing at any stage — ingredient, formula, or finished product. PETA/Leaping Bunny standard. Verify supplier chain.
- Vegan: no animal-derived ingredients or animal byproducts. Exclude: lanolin, beeswax, honey, carmine, collagen (bovine/marine), silk protein, allantoin (if not synthetic or comfrey-sourced), squalane (shark — use olive-derived only).
- Gluten Free: no wheat, barley, rye, or oat-derived ingredients. Flag hydrolyzed wheat protein (common emollient/conditioner). Certified gluten-free alternatives only.
- Clinical Grade: ingredients at therapeutic concentrations with clinical evidence. Minimum: peer-reviewed study or established dermatology consensus. No ingredient is included for marketing appeal alone. Concentrations must meet or exceed the ranges used in published studies.
- Pharmaceutical Grade: USP/BP/EP purity standards where applicable. Highest purity specification — pharmaceutical-grade niacinamide, retinol, ascorbic acid, peptides. Supplier COA (Certificate of Analysis) required. No cosmetic-grade substitution when pharmaceutical-grade is requested.

SOURCING CONFLICT RULES:
- If Vegan is selected: exclude beeswax (use candelilla), lanolin (use plant ceramides or shea), marine collagen (use plant peptides), shark squalane (use Amaranthus-derived or olive-derived squalane).
- If Gluten Free is selected: exclude hydrolyzed wheat protein, oat extract (unless certified GF oat), barley extract.
- If Pharmaceutical Grade is selected: all key actives must reference USP-grade specification in the formula card.
- If Wild Crafted is selected: note species, region, and sustainability status (CITES listed plants must be excluded or use farmed alternatives).
- Conflicting standards (e.g., Raw + Pharmaceutical Grade on the same active) should be flagged — explain the trade-off, recommend which standard takes priority for that ingredient.

MARKET CONTEXT:
The beauty industry ships 30,000 products a year. 85% fail. Every A List formula is built for one skin — not a shelf slot. The curation IS the product. What we leave out matters as much as what we put in.

HOW YOU ANALYZE AND RESPOND:
- Evidence-based dermatology and cosmetic chemistry only. No trends. No buzzwords.
- Every ingredient choice must be traceable to the client's actual skin data.
- Fewer, precise ingredients beat broad-spectrum formulas every time.
- Flag all conflicts, contraindications, and medication interactions explicitly.
- If the skin is not ready for an active, say so and prescribe what to address first.
- Clinical precision. Explain the WHY in one sentence per ingredient.
- Treat the client as an intelligent adult who deserves the real answer.`,
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
// skinMap: result from step 2, goals: array, sourcing: array of client sourcing standards
async function handleIngredients(client, { skinMap = {}, goals = [], sourcing = [] }) {
    const sourcingLine = sourcing.length
        ? `\nINGREDIENT SOURCING REQUIREMENTS: The client has declared the following standards — ALL ingredient selections must comply: ${sourcing.join(", ")}. Flag any ingredient that cannot meet a declared standard and propose a compliant alternative.`
        : "";
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Based on this skin map and client goals, select ONLY the ingredients that are directly indicated. Fewer precise ingredients beat a broad-spectrum list every time.${sourcingLine}

For each ingredient return as a JSON array of objects:
{ "name": "", "inci": "", "purpose": "", "concentrationRange": "", "applicationOrder": 0, "whyThisSkin": "", "sourcingNotes": "", "contraindication": "" }

"sourcingNotes" should confirm compliance with declared standards or flag a trade-off.

Exclude anything not clearly earned by this skin profile. If a goal requires an active the skin cannot currently tolerate, note it in a "deferred" array with a reason.

Skin map:
${JSON.stringify(skinMap, null, 2)}

Client goals: ${goals.join(", ")}`,
        }],
    });
    return ok({ ingredients: msg.content[0].text, usage: msg.usage });
}

// Step 4: Custom Formulation
// skinMap, selectedIngredients, productType (essence|serum|cream|gel|mousse|toner|treatment),
// preferences: { scent, packaging, charitable, sourcing[] }
async function handleFormulate(client, { skinMap = {}, selectedIngredients = [], productType, preferences = {} }) {
    if (!productType) return err(400, "productType is required");

    // Map product type to pyramid tier context
    const pyramidContext = {
        essence: "ESSENCE tier (70-80% water): hydrating & lightweight. Prioritise humectants and skin-identical hydrators. Do not attempt to carry high concentrations of oil-soluble actives.",
        serum:   "SERUM tier (60-70% water): concentrated & silky. This is the correction layer — carry meaningful actives at therapeutic concentrations.",
        cream:   "CREAM tier (50-60% water): rich & nourishing. Occlusive layer applied last. Focus on barrier lipids, emollients, and locking in the treatment layers beneath.",
        gel:     "GEL base: water-based with gelling agent. Lightweight, high skin tolerance. Good for acne-prone, oily, and sensitive skin.",
        mousse:  "MOUSSE base: aerated emulsion. Ultra-light delivery. Suited for oily skin, body application, or texture-sensitive clients.",
        toner:   "TONER: functional pre-serum step. pH prep, light exfoliation, or hydration. Not a rinse — designed to stay on skin.",
        treatment: "TREATMENT: targeted spot or zone application. Highest active concentration. Short contact time or overnight depending on actives.",
    };
    const tier = pyramidContext[productType.toLowerCase()] || `${productType} formulation`;

    const scent = preferences.scent || "unscented";
    const packaging = preferences.packaging || "eco (glass or aluminium preferred)";
    const charitable = preferences.charitable
        ? "A portion of this product's revenue goes to The Ginette N. BoBo Foundation. Note this in the formula card."
        : "";
    const sourcing = Array.isArray(preferences.sourcing) && preferences.sourcing.length
        ? `INGREDIENT SOURCING STANDARDS (mandatory compliance): ${preferences.sourcing.join(", ")}. Every ingredient in this formula must comply. Flag any conflict or trade-off under "sourcingNotes" in each ingredient object. Add a "sourcingCertifications" field to the root formula object listing all standards this formula satisfies.`
        : "";

    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 2048,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: `Build a complete custom A List formulation for the Ambitiously By BoBo product line.

PRODUCT TYPE: ${tier}
SCENT PREFERENCE: ${scent}
PACKAGING: ${packaging}
${charitable}
${sourcing}

This is NOT a generic formula. Every ingredient must be traceable to this client's actual skin data. Return JSON only:
{
  "formulaName": "",
  "pyramidTier": "",             // essence | serum | cream | gel | mousse | toner | treatment
  "positioningLine": "",         // one sentence: why this formula exists for this skin specifically
  "waterPhase": {
    "percentage": "",
    "components": [{ "name": "", "inci": "", "percentage": "", "role": "" }]
  },
  "activeIngredients": [{ "name": "", "inci": "", "percentage": "", "benefit": "", "whyThisSkin": "", "sourcingNotes": "" }],
  "emollients": [{ "name": "", "inci": "", "percentage": "", "role": "" }],
  "preservativeSystem": { "system": "", "percentage": "", "broadSpectrumCoverage": true },
  "pH": "",
  "texture": "",
  "scentProfile": "",
  "packagingRecommendation": "",
  "ecoCredentials": "",          // why this formula qualifies as sustainable/biodegradable
  "sourcingCertifications": [],  // all declared sourcing standards this formula satisfies
  "usageInstructions": "",
  "layeringPosition": "",        // where in routine: 1=first, 2=second etc
  "shelfLifeMonths": 0,
  "estimatedCostCAD": "",
  "whatWeLeftOut": "",           // ingredients considered but excluded and why — the curation proof
  "clientSummary": ""            // plain-language 2-sentence summary the client receives on their formula card
}

Skin map:
${JSON.stringify(skinMap, null, 2)}

Selected ingredients: ${selectedIngredients.join(", ")}
Additional preferences: ${JSON.stringify(preferences)}`,
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
