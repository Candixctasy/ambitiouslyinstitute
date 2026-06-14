#!/usr/bin/env node
/**
 * Populates and standardizes the incompatibilities field for all 178 ingredients.
 * Converts any string format to arrays. Fills in all empties with correct data.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../bybobo/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ─── Incompatibility map by slug ──────────────────────────────────────────────
// Each entry is an array of plain-text strings.
// "Why" is always included so C-Ai and the UI can explain the reason.

const incompatMap = {

  // ── Exfoliating Acids ───────────────────────────────────────────────────────
  'glycolic-acid': [
    'Never combine with retinol or retinoids in the same application — compounded exfoliation causes severe barrier disruption and chemical irritation',
    'Never combine with benzoyl peroxide in the same formula — both are irritants and combined use causes barrier breakdown',
    'Separate from niacinamide by 30+ minutes (use different routines if possible) — low-pH environment converts niacinamide to niacin, causing skin flushing',
    'Separate from vitamin C (L-ascorbic acid) by routine — competing pH requirements and compounded acid burden',
    'PM use only — AHAs increase photosensitivity; always follow with SPF the next morning',
    'Do not apply to a compromised, broken, or severely dehydrated barrier',
  ],
  'lactic-acid': [
    'Never combine with retinoids in the same application — compounded barrier disruption',
    'Separate from niacinamide by routine — low pH causes niacin conversion',
    'Avoid stacking with BHAs (salicylic acid) at therapeutic concentrations in the same step',
    'PM use preferred — increases photosensitivity; daily SPF required',
  ],
  'salicylic-acid': [
    'Never combine with retinoids in the same formula — compounded exfoliation and barrier damage',
    'Avoid stacking with multiple AHAs at high concentrations in the same step — compounded acid burden',
    'Do not combine with high-concentration zinc oxide — salt formation alters formula texture',
    'PM use only — photosensitizing',
    'Do not use on broken, weeping, or severely compromised skin',
  ],
  'willow-bark-extract': [
    'Do not layer with retinoids simultaneously — natural BHA activity compounds with retinoid-driven cell turnover',
    'Avoid stacking with synthetic AHAs at high concentrations — compounded exfoliant load',
    'Separate from vitamin C (L-ascorbic acid) in same step — pH conflict',
  ],
  'gluconolactone': [
    'Avoid combining with very high-concentration AHAs or BHAs at full therapeutic doses — additive acid burden even though PHAs are gentler',
    'Separate from retinoids by routine if using at >5%',
  ],
  'lactobionic-acid': [
    'Avoid combining with very high-concentration retinoids without barrier assessment first',
    'Generally the gentlest exfoliant category — far fewer incompatibilities than AHAs or BHAs',
  ],

  // ── Retinol & Retinoid-Type ──────────────────────────────────────────────────
  'retinol': [
    'Never combine with AHAs (glycolic, lactic, mandelic, tartaric) in the same application — severe compounded barrier disruption',
    'Never combine with BHAs (salicylic acid, willow bark) in the same formula — compounded exfoliation and barrier damage',
    'Never combine with benzoyl peroxide — BPO oxidizes and fully deactivates retinol',
    'Separate from vitamin C (L-ascorbic acid) by using different routines — vitamin C requires pH 2.5–3.5; retinol requires pH 5–7; combining causes mutual destabilization',
    'PM use only — retinol degrades under UV light and increases photosensitivity',
    'Do not apply to a compromised, broken, or severely dehydrated barrier — address barrier repair first',
    'Avoid with high-concentration tea tree oil or other sensitizing actives — compounded irritation',
  ],
  'bakuchiol': [
    'Avoid stacking with high-concentration AHAs or BHAs — bakuchiol provides retinol-like cell turnover; adding acids compounds the exfoliant load for sensitive skin',
    'Generally one of the most compatible retinol alternatives — chosen specifically for sensitive skin',
    'Avoid in formulas with benzoyl peroxide — unnecessary oxidative load',
  ],
  'retinol-alternative': [  // catch-all slug if any
    'Avoid combining with high-concentration direct acids',
    'PM use preferred',
  ],

  // ── Vitamin C Family ────────────────────────────────────────────────────────
  'vitamin-c': [
    'Never combine with copper peptides (GHK-Cu) in the same step — ascorbic acid chelates copper, deactivating the peptide',
    'Separate from niacinamide by 30 min (different routines ideal) — at elevated temperatures forms niacin causing skin flushing',
    'Never combine with benzoyl peroxide — BPO oxidizes ascorbic acid rendering it ineffective',
    'Avoid in formulas with pH above 4 — L-ascorbic acid oxidizes rapidly at higher pH, formula turns orange and loses activity',
    'Separate from retinoids by routine — pH conflict',
    'AM use preferred — antioxidant protection synergizes with SPF',
  ],
  'magnesium-ascorbyl-phosphate': [
    'Separate from copper peptides by routine — ascorbic acid family can chelate copper',
    'Avoid combining with benzoyl peroxide — oxidation',
    'More pH-stable than L-ascorbic acid but still avoid strong alkaline ingredients',
  ],
  'ascorbic-acid': [  // any direct ascorbic acid slug
    'Never combine with copper peptides — chelates copper, deactivates peptide',
    'Never combine with benzoyl peroxide — mutual deactivation',
    'Separate from niacinamide by routine',
    'Keep at pH 2.5–3.5 for stability',
  ],

  // ── Copper Peptides ─────────────────────────────────────────────────────────
  'copper-peptides': [
    'Never combine with direct acids (AHAs, BHAs, L-ascorbic acid) in the same step — acid environment degrades copper-peptide complex',
    'Never combine with vitamin C (L-ascorbic acid) — ascorbic acid chelates copper, rendering the peptide biologically inactive',
    'Avoid benzoyl peroxide — oxidizes peptide bonds',
    'PM use only — separate from vitamin C by at least 8 hours',
    'Do not use in the same routine as retinol without assessment — both drive cell turnover; alternate nights recommended',
  ],
  'ghk-cu': [
    'Never combine with direct acids (AHAs, BHAs) or vitamin C (L-ascorbic acid) in the same step — acid degrades copper complex',
    'PM use only',
    'Alternate nights with retinol — both drive cell turnover; combined use can over-stimulate and irritate',
  ],

  // ── Other Peptides ──────────────────────────────────────────────────────────
  'matrixyl': [
    'Avoid direct combination in same formula with very high-concentration vitamin C (pH below 3.5) — peptide bond stability at very low pH',
    'Generally stable across pH 4.5–7 and compatible with most skincare actives',
  ],
  'palmitoyl-tripeptide-1': [
    'Avoid very low pH formulas (below 3.5) — peptide bond stability concern',
    'Compatible with niacinamide, hyaluronic acid, ceramides, and most standard actives',
  ],
  'palmitoyl-tetrapeptide-7': [
    'Avoid very low pH formulas (below 3.5)',
    'Compatible with most actives when formulated at appropriate pH',
  ],
  'argireline': [
    'Avoid highly acidic formulas (pH below 3.5) — peptide destabilization',
    'Do not combine with benzoyl peroxide — oxidizes peptide bonds',
    'Generally well-tolerated and compatible with most other actives',
  ],
  'snap-8-peptide': [
    'Avoid highly acidic formulas (pH below 3.5)',
    'Do not combine with oxidizing agents (benzoyl peroxide, high-concentration peroxides)',
    'Compatible with niacinamide, hyaluronic acid, ceramides',
  ],
  'tripeptide-29': [
    'Avoid very low pH formulas — peptide stability',
    'Compatible with most actives at pH 4.5–7',
  ],
  'eyeseryl-peptide-complex': [
    'Avoid highly acidic formulas (pH below 3.5)',
    'Generally very gentle — formulated specifically for the delicate eye area',
  ],

  // ── Niacinamide ─────────────────────────────────────────────────────────────
  'niacinamide': [
    'Separate from pure vitamin C (L-ascorbic acid) by at least 30 minutes (different routines preferred) — at elevated temperatures they can form niacin causing skin flushing; less of a concern in well-formulated modern products but traditional guidance still applies',
    'Avoid formulating in pH below 5 with heat exposure — converts to niacin',
    'One of the most stackable actives — compatible with retinoids, peptides, AHAs, BHAs, ceramides, and most other ingredients',
  ],
  'niacinamide-b3-complex': [
    'Same as niacinamide — separate from L-ascorbic acid by routine',
    'Very compatible with virtually all other actives',
  ],

  // ── Kojic Acid ──────────────────────────────────────────────────────────────
  'kojic-acid': [
    'Unstable above pH 5.5 — do not combine with alkaline ingredients or high-pH formulas; kojic acid browns and loses brightening activity',
    'Avoid combining with hydrogen peroxide or oxidizing agents — rapid degradation',
    'Avoid pH below 3 — accelerated breakdown without added benefit',
    'Can cause photosensitivity — use with daily SPF',
    'Do not stack with high-concentration L-ascorbic acid in same formula without pH reconciliation',
  ],

  // ── Alpha Arbutin ────────────────────────────────────────────────────────────
  'alpha-arbutin': [
    'Avoid pH below 3.5 — hydrolyzes to free hydroquinone at very low pH (regulatory concern in EU and some markets)',
    'Generally very compatible — synergistic with vitamin C derivatives, niacinamide, and tranexamic acid for brightening',
    'Do not combine with highly acidic formulas without pH buffering',
  ],

  // ── Bearberry / Uva Ursi ────────────────────────────────────────────────────
  'uva-ursi-extract': [
    'Avoid pH below 3.5 — arbutin content can hydrolyze to hydroquinone',
    'Compatible with niacinamide, vitamin C derivatives, and other brightening actives',
    'Additive brightening effect with alpha-arbutin — reduce one to prevent over-inhibiting tyrosinase',
  ],

  // ── Tranexamic Acid ──────────────────────────────────────────────────────────
  'tranexamic-acid': [
    'Generally very compatible — stable across pH 4–7',
    'Avoid combining in the same step with very high-dose AHAs (excess acid burden)',
    'Compatible with niacinamide, vitamin C derivatives, peptides, and ceramides',
  ],

  // ── Azelaic Acid ────────────────────────────────────────────────────────────
  'azelaic-acid': [
    'Avoid direct layering with high-concentration retinoids without barrier assessment — both drive cell turnover',
    'Separate from very high-concentration AHAs — additive exfoliant effect',
    'Generally well-tolerated — can be used AM or PM, compatible with most actives',
  ],

  // ── Tea Tree Oil ────────────────────────────────────────────────────────────
  'tea-tree-oil': [
    'Never use undiluted on skin — severe irritation and potential chemical burn',
    'Do not combine with high-concentration AHAs or retinoids on sensitive skin — compounded irritation',
    'Avoid on open wounds or severely compromised barrier',
    'Do not use near eyes',
    'Maximum 5% topical concentration for leave-on products',
  ],

  // ── Essential Oils ──────────────────────────────────────────────────────────
  'neroli-essential-oil': [
    'Do not apply before UV/sun exposure — furocoumarin compounds cause phototoxic burns (severe photosensitization)',
    'PM use only in leave-on formulas, or use only if followed by high SPF',
    'Known fragrance allergen — avoid on sensitive or reactive skin',
    'IFRA-regulated; do not exceed recommended use level for the product category',
  ],
  'ylang-ylang-essential-oil': [
    'Known fragrance allergen — avoid on sensitive, reactive, or allergy-prone skin',
    'Do not exceed 0.8% in rinse-off and leave-on products (IFRA/RIFM limit)',
    'Avoid combining with other sensitizing fragrance components where cumulative dose approaches regulatory limits',
  ],
  'helichrysum-italicum-oil': [
    'Avoid in formulas for very oily or acne-prone skin at high concentrations — aromatic oil profile',
    'IFRA compliance review required for sensitizing compounds in some extracts',
    'Patch test for sensitized individuals — aromatic compounds can cause contact reactions',
  ],
  'lavender-extract': [
    'Fragrance allergen at concentrations >0.5% — flag for sensitive skin',
    'Do not combine with other high-fragrance-allergen components where cumulative dose exceeds safety thresholds',
    'Linalool can oxidize — use in antioxidant-stabilized formulas',
  ],

  // ── Cinnamon & Cassia ───────────────────────────────────────────────────────
  'cinnamon-bark-extract': [
    'Never combine with sensitive skin actives (retinoids, AHAs) — compounded severe irritation',
    'Avoid on reactive, rosacea-prone, or inflamed skin',
    'Keep below 0.5% in leave-on products — cinnamal is a known sensitizer (IFRA regulated)',
    'Do not use near eyes or mucous membranes',
  ],
  'cassia-extract': [
    'Highly sensitizing — never use undiluted',
    'Avoid on sensitive, reactive, or inflamed skin',
    'Do not combine with other high-sensitization actives',
    'Maximum 0.2% in leave-on formulas',
  ],

  // ── Phytic Acid ─────────────────────────────────────────────────────────────
  'phytic-acid': [
    'Avoid in formulas where zinc is the primary antimicrobial — phytic acid chelates zinc, reducing its activity',
    'Avoid with mineral actives (zinc oxide at high %) in brightening formulas — chelation reduces efficacy',
    'Generally compatible with brightening, AHA, and antioxidant actives',
  ],

  // ── Calamus ─────────────────────────────────────────────────────────────────
  'calamus-extract': [
    'Asarone content varies by species — always source Acorus calamus (not A. americanus) from reputable cosmetic ingredient suppliers',
    'Regulatory review required for asarone content in some markets — check applicable regulations before formulating',
    'Not for use near eyes or on broken skin',
  ],

  // ── Galbanum ────────────────────────────────────────────────────────────────
  'galbanum-resin': [
    'Rare sensitizer — patch test on sensitive skin individuals before use',
    'Avoid combining with synthetic fragrance components that may destabilize the natural resin complex',
  ],

  // ── Alpha Lipoic Acid ───────────────────────────────────────────────────────
  'alpha-lipoic-acid': [
    'Avoid in formulas with high-concentration metal ions — chelation can alter formula stability',
    'Sensitive to oxidation — requires antioxidant-friendly formula environment (stable packaging, vitamin E co-formulation)',
    'Some reports of irritation when combined with direct acids at therapeutic concentrations — separate by routine if using both',
  ],

  // ── Ellagic Acid ────────────────────────────────────────────────────────────
  'ellagic-acid': [
    'Avoid formulating in pH above 7 — degradation at alkaline pH',
    'Generally compatible with most brightening and antioxidant actives',
  ],

  // ── Sea Buckthorn (color staining) ─────────────────────────────────────────
  'sea-buckthorn-co2-extract': [
    'Intense yellow-orange color — stains skin and formulas at concentrations above 1%',
    'Use at maximum 1–3% in finished formulas; blend with other oils to reduce color impact',
    'Avoid in white or pale-colored finished products',
  ],
  'sea-buckthorn-berry-oil': [
    'Intense orange color — use at maximum 1–5%; will visibly tint skin and formula',
    'High carotenoid and fatty acid content — short shelf life; requires antioxidant stabilization',
    'Avoid in formulas where color neutrality is required',
  ],

  // ── Fixed Oils — Key Notes ──────────────────────────────────────────────────
  'rosehip-oil': [
    'Short shelf life — high linoleic acid and carotenoid content oxidizes within 6–12 months',
    'Requires antioxidant stabilization (Tocopherol) in formulas',
    'May be comedogenic at high concentrations for acne-prone skin — patch test',
    'Keep below 40°C during formulation — heat-sensitive fatty acids',
  ],
  'hemp-seed-oil': [
    'Short shelf life — high polyunsaturated fatty acid content is prone to oxidation',
    'Requires antioxidant stabilization; keep refrigerated after opening',
    'Keep below 40°C during formulation',
  ],
  'sea-buckthorn-oil': [
    'Intense orange color stains formulas and skin — use at maximum 3–5%',
    'High PUFA content — short shelf life; requires antioxidant (Tocopherol) stabilization',
  ],
  'borage-seed-oil': [
    'Short shelf life — very high GLA (gamma-linolenic acid) content oxidizes rapidly',
    'Requires Tocopherol antioxidant stabilization',
    'Keep below 40°C in formulation',
  ],
  'evening-primrose-oil': [
    'Short shelf life — high GLA content oxidizes rapidly',
    'Requires antioxidant stabilization',
    'Keep below 40°C in formulation',
  ],
  'cloudberry-seed-oil': [
    'Short shelf life — high omega-3 (alpha-linolenic acid) content is highly prone to oxidation',
    'Requires Tocopherol or mixed tocopherol antioxidant stabilization',
    'Cold-chain storage preferred',
  ],
  'blackcurrant-seed-oil': [
    'Short shelf life — high GLA and stearidonic acid content oxidizes rapidly',
    'Requires antioxidant stabilization; refrigerate after opening',
  ],
  'raspberry-seed-oil': [
    'Short shelf life — high linolenic acid content prone to oxidation',
    'Requires antioxidant stabilization',
    'Do not heat above 40°C',
  ],
  'olive-oil': [
    'Avoid at high concentrations in formulas for acne-prone skin — oleic acid can be comedogenic',
    'Heavy texture — blend with lighter oils (jojoba, squalane) for facial formulas',
    'Keep below 40°C in formulation — cold-pressed quality degrades with heat',
  ],
  'avocado-oil': [
    'High oleic acid content — may be comedogenic at high concentrations for acne-prone skin',
    'Avoid in lightweight serums — heavy texture unsuitable without dilution',
    'Keep below 40°C in formulation',
  ],
  'maracuja-oil': [
    'High linoleic content — short shelf life; requires antioxidant stabilization',
    'Keep below 40°C',
  ],
  'sacha-inchi-oil': [
    'Very high omega-3 content — extremely short shelf life; highly prone to oxidation',
    'Requires strong antioxidant stabilization; store refrigerated',
    'Do not heat above 35°C',
  ],
  'broccoli-seed-oil': [
    'Generally stable — erucic acid-rich profile resists oxidation better than high-PUFA oils',
    'Avoid at high concentrations for acne-prone skin',
  ],

  // ── Hyaluronic Acid / Humectants ────────────────────────────────────────────
  'sodium-hyaluronate': [
    'Avoid using without an occlusive follow-up in low-humidity environments — high-MW HA draws moisture from the skin when the air is drier than the skin',
    'Avoid very high alcohol concentrations in the same formula — alcohol dehydrates and counteracts HA\'s moisture-binding function',
    'Generally one of the most compatible cosmetic ingredients',
  ],
  'hyaluronic-acid': [
    'Avoid without occlusive in very dry environments — humectant without sealant draws transepidermal moisture outward',
    'Generally very compatible with all actives',
  ],
  'polyglutamic-acid': [
    'Avoid very high alcohol concentrations — alcohol dehydration counteracts PGA\'s film-forming moisture retention',
    'Generally excellent compatibility — one of the most stackable humectants',
  ],
  'glycerin': [
    'Avoid at >15% concentration without an occlusive in very dry climates — can draw moisture from skin',
    'One of the most compatible cosmetic ingredients — essentially no active ingredient incompatibilities',
  ],
  'sodium-pca': [
    'Avoid very high alcohol concentrations in same formula',
    'Generally very compatible — natural moisturizing factor component',
  ],
  'betaine': [
    'Essentially no known incompatibilities at cosmetic use levels',
    'One of the most gentle and compatible humectants available',
  ],

  // ── Ceramides ───────────────────────────────────────────────────────────────
  'ceramide-np': [
    'Requires formulation at appropriate temperature — ceramides need melting/lipid phase processing',
    'Virtually no incompatibilities at cosmetic use levels — one of the most skin-compatible actives',
  ],
  'ceramide-eg': [
    'Process in lipid phase at appropriate temperature',
    'No significant incompatibilities — skin-identical ingredient',
  ],

  // ── Squalane ────────────────────────────────────────────────────────────────
  'squalane': [
    'Apply as a final layer (occlusive) — if applied first, it may prevent water-phase actives from absorbing effectively',
    'Virtually no incompatibilities — one of the most stable and safe cosmetic emollients',
    'Ensure source is olive-derived or Amaranthus-derived (NOT shark-derived) for vegan compliance',
  ],

  // ── Neem ────────────────────────────────────────────────────────────────────
  'neem-oil': [
    'Always dilute — high concentrations cause significant irritation',
    'Strong sulfur-like odor may be incompatible with fragrance-sensitive formulas',
    'Do not apply to broken or severely compromised skin undiluted',
    'Avoid near eyes',
  ],

  // ── AHA-related Exfoliants ─────────────────────────────────────────────────
  'mandelic-acid': [
    'Never combine with retinoids in same application — compounded barrier disruption',
    'Separate from niacinamide by routine — low pH causes niacin conversion',
    'PM use preferred — photosensitizing',
    'Gentler than glycolic for darker skin types (lower PIH risk) but still requires SPF compliance',
  ],

  // ── Vitamin E / Tocopherol ──────────────────────────────────────────────────
  'tocopherol': [
    'Avoid combining with niacin derivatives at high temperatures — minor stability concern',
    'Generally one of the most compatible antioxidants — recommended as antioxidant stabilizer for PUFA-rich oils',
    'Oil-soluble only — does not dissolve in water-phase without ester form',
  ],

  // ── Panthenol (B5) ──────────────────────────────────────────────────────────
  'panthenol': [
    'Virtually no known incompatibilities — one of the most universally compatible cosmetic actives',
    'Compatible with retinoids, acids, peptides, and all skin types',
  ],

  // ── Adenosine ───────────────────────────────────────────────────────────────
  'adenosine': [
    'Stable at neutral to slightly acidic pH (4.5–7)',
    'Avoid very low pH formulas (below 4) — potential degradation',
    'Generally very compatible with peptides, niacinamide, and hyaluronic acid',
  ],

  // ── Zinc PCA ────────────────────────────────────────────────────────────────
  'zinc-pca': [
    'Avoid combining with high-concentration phytic acid — chelation may reduce zinc\'s sebum-regulating activity',
    'Generally compatible with niacinamide, salicylic acid, and most oily-skin actives',
  ],

  // ── Zinc Oxide ──────────────────────────────────────────────────────────────
  'zinc-oxide': [
    'Avoid combining with salicylic acid in high concentrations — salt formation can alter formula texture and reduce both actives\' efficacy',
    'Do not formulate at very low pH — zinc oxide is alkaline-stable; very acidic environment reduces its UV-filtering performance',
    'Incompatible with strong acid-based active delivery systems (pH below 4)',
  ],

  // ── Allantoin ───────────────────────────────────────────────────────────────
  'allantoin': [
    'Avoid very low pH formulas (below 3.5) — allantoin degrades at extreme acidity',
    'One of the most compatible cosmetic actives — highly stackable with retinoids, acids, peptides, and ceramides',
  ],

  // ── Centella Asiatica ───────────────────────────────────────────────────────
  'centella-asiatica-extract': [
    'Avoid combining with high-concentration AHAs in the same step — acid may degrade triterpenoid compounds',
    'Generally excellent compatibility — specifically formulated for sensitive skin',
  ],
  'madecassoside': [
    'Avoid very low pH formulas — triterpenoid stability concern at pH below 4',
    'Highly compatible with ceramides, ectoin, and barrier-repair actives',
  ],

  // ── Beta Glucan ─────────────────────────────────────────────────────────────
  'beta-glucan': [
    'Avoid very high alcohol concentrations — can degrade polysaccharide structure',
    'Generally very compatible — one of the most soothing and non-reactive cosmetic actives',
    'Note: Oat-derived beta glucan is not certified gluten-free — exclude for gluten-free formulations unless certified GF oat source is used',
  ],

  // ── Oat Extract ─────────────────────────────────────────────────────────────
  'oat-extract': [
    'GLUTEN-FREE WARNING: Not suitable for gluten-free formulations unless certified GF oat source (look for "certified gluten-free" INCI)',
    'Avoid very high alcohol concentrations',
    'Generally very compatible with sensitive-skin actives',
  ],

  // ── Ectoin ──────────────────────────────────────────────────────────────────
  'ectoin': [
    'Virtually no known incompatibilities — one of the most universally compatible cosmetic actives',
    'Stable across pH 3–9, temperature stable, compatible with all skin types and most actives',
    'Acts as a protective molecule around other actives — can actually enhance stability of surrounding ingredients',
  ],

  // ── Inulin ──────────────────────────────────────────────────────────────────
  'inulin': [
    'Avoid very high temperature processing — degrades prebiotic structure',
    'Generally very compatible — prebiotic with low reactivity',
  ],

  // ── Ferments ────────────────────────────────────────────────────────────────
  'saccharomyces-ferment-filtrate': [
    'Avoid at very low pH (below 3.5) — protein and bioactive degradation in filtrate',
    'Generally compatible with most cosmetic actives',
  ],
  'bifida-ferment-lysate': [
    'Avoid at very low pH (below 3.5)',
    'Generally well-tolerated and compatible with barrier-repair and anti-aging actives',
  ],
  'galactomyces-ferment-filtrate': [
    'Avoid at very low pH (below 3.5) — galactomyces ferment actives degrade',
    'Generally compatible with brightening and anti-aging formulas',
  ],
  'lactobacillus-ferment': [
    'Avoid at very low pH or high heat — destroys probiotic-like bioactives in filtrate',
    'Generally compatible with humectants, ceramides, and most cosmetic actives',
  ],
  'kombucha': [
    'Already slightly acidic — check combined pH when formulating with additional acids',
    'Generally compatible with most actives; ferment-based so avoid boiling temperatures',
  ],
  'sea-kelp-bioferment': [
    'Avoid at very low pH (below 3)',
    'Generally compatible with most actives',
  ],

  // ── Brightening Botanicals ──────────────────────────────────────────────────
  'licorice-root-extract': [
    'Avoid very high pH (>7) — glabridin stability decreases at alkaline pH',
    'Generally compatible with most brightening actives — synergistic with niacinamide and vitamin C derivatives',
  ],
  'turmeric-extract': [
    'Stains skin and formulas yellow-orange — use encapsulated form or at very low concentration (0.5–1%)',
    'Avoid in formulas where color neutrality is required',
    'Phototoxicity risk at very high concentrations — use with SPF guidance',
  ],
  'turmeric-co2-extract': [
    'Intense yellow color — stains; use at maximum 0.5–1% or in encapsulated form',
    'Generally compatible with most actives at cosmetic use levels',
  ],
  'kojic-acid': [  // already defined but adding redundantly for safety
    'Unstable above pH 5.5 — do not combine with alkaline ingredients; browning and loss of activity',
    'Avoid oxidizing agents — rapid degradation',
    'Phototoxicity risk — use with daily SPF',
  ],

  // ── Helix Aspersa (Snail Mucin) ─────────────────────────────────────────────
  'helix-aspersa-extract': [
    'NOT vegan — snail mucin is an animal-derived ingredient; exclude from all vegan formulations',
    'Avoid at very low pH (below 4) — glycoproteins and growth factors in mucin degrade',
    'Generally compatible with most cosmetic actives at neutral to slightly acidic pH',
  ],

  // ── Colostrum ───────────────────────────────────────────────────────────────
  'colostrum': [
    'NOT vegan — bovine colostrum is an animal-derived ingredient; exclude from vegan formulations',
    'Avoid at very low pH — growth factors and immunoglobulins denature at extreme acidity',
    'Keep below 40°C during formulation — heat-sensitive bioactives',
  ],

  // ── Preservatives ───────────────────────────────────────────────────────────
  'phenoxyethanol': [
    'Avoid at concentrations above 1% in leave-on products (EU Cosmetics Regulation limit)',
    'Avoid in products for infants under 3 (French ANSM guidance)',
    'Generally very compatible — broad-spectrum preservative, no pH restriction',
  ],
  'sodium-levulinate': [
    'Most effective at pH 4–6; reduced efficacy above pH 6.5',
    'Mild preservative — typically used in combination with other preservatives for full broad-spectrum coverage',
  ],

  // ── Emulsifiers & Texture ───────────────────────────────────────────────────
  'xanthan-gum': [
    'Avoid combining with cationic polymers (e.g., cationic guar) — forms precipitate',
    'Performance affected by very high salt concentrations',
    'Generally very compatible with most cosmetic actives',
  ],
  'cetearyl-alcohol': [
    'Avoid in formulas labeled as strictly alcohol-free (fatty alcohols are technically alcohols)',
    'Generally very compatible — acts as emollient and emulsion stabilizer',
  ],
  'hydroxyethylcellulose': [
    'Avoid combining with cationic surfactants at high concentrations — can cause precipitation',
    'Generally very compatible — natural cellulose-derived thickener',
  ],
  'glyceryl-stearate': [
    'Self-emulsifying grade (SE) contains soap — avoid in formulas where soap traces are problematic',
    'Generally very compatible — standard emulsifying ingredient',
  ],

  // ── Surfactants ─────────────────────────────────────────────────────────────
  'decyl-glucoside': [
    'Alkaline pH (7–9.5) — not suitable for low-pH actives (retinoids, AHAs, vitamin C) in the same formula without pH adjustment',
    'Generally very gentle and skin-compatible at correct pH',
  ],
  'coco-glucoside': [
    'Slightly alkaline — not suitable with low-pH actives without pH adjustment',
    'Generally very gentle — suitable for sensitive skin formulas',
  ],
  'sodium-cocoyl-isethionate': [
    'Avoid at pH below 4.5 — hydrolysis under acidic conditions',
    'Generally very gentle — one of the mildest surfactants',
  ],
  'sunflower-lecithin': [
    'Can promote rancidity in oil-heavy formulas without antioxidant stabilization',
    'Generally very compatible — phospholipid emulsifier with skin-affinity',
  ],

  // ── Vitamin K2 ───────────────────────────────────────────────────────────────
  'vitamin-k2': [
    'Avoid formulas with strong oxidizing agents — vitamin K2 can be oxidized',
    'Generally very compatible — used in combination with vitamin C and retinoids for anti-aging',
  ],

  // ── Sacred / Biblical Botanicals ────────────────────────────────────────────
  'frankincense-extract': [
    'Fragrance allergen component — flag for sensitive skin at higher concentrations',
    'Generally very compatible as a botanical anti-inflammatory',
  ],
  'myrrh-extract': [
    'Fragrance allergen component at higher concentrations',
    'Generally very compatible as antimicrobial and anti-inflammatory botanical',
  ],
  'spikenard-extract': [
    'Fragrance allergen — do not exceed IFRA recommended use levels',
    'Avoid on severely sensitive or reactive skin at high concentrations',
  ],
  'hyssop-extract': [
    'Pinocamphone content in essential oil can be neurotoxic at high doses — cosmetic extract form is safe at recommended use levels (below 1%)',
    'Not for use near eyes',
    'Generally safe and compatible at cosmetic concentrations',
  ],
  'cedarwood-extract': [
    'Fragrance component — IFRA-regulated; do not exceed use level guidelines',
    'Avoid on very sensitive skin at high concentrations',
  ],
  'rose-hydrosol': [
    'Slight fragrance content — flag for highly sensitive or fragrance-reactive skin',
    'Generally one of the gentlest and most compatible botanical waters',
  ],
  'rose-damascena-extract': [
    'Fragrance allergen (geraniol, citronellol content) — flag for sensitive skin',
    'IFRA compliance required at higher concentrations',
  ],

  // ── Canadian Indigenous Botanicals ──────────────────────────────────────────
  'labrador-tea-extract': [
    'Ledol and other sesquiterpene content — avoid high concentrations in leave-on products on very sensitive skin',
    'Generally safe and compatible at cosmetic use concentrations (1–3%)',
  ],
  'sweetgrass-extract': [
    'Coumarin content — check applicable regulatory limits for leave-on products (IFRA/EU Cosmetics Regulation limits on coumarin)',
    'Generally very gentle and well-tolerated at cosmetic use levels',
  ],

  // ── Ashwagandha ──────────────────────────────────────────────────────────────
  'ashwagandha-extract': [
    'Avoid at very high concentrations in formulas for acne-prone skin — adaptogen withanolides may slightly stimulate oil activity in some individuals',
    'Generally very compatible — anti-inflammatory and adaptogenic botanical',
  ],

  // ── Bromelain / Papain ───────────────────────────────────────────────────────
  'bromelain': [
    'Avoid combining with very high-concentration AHAs or BHAs — enzymatic exfoliation adds to acid-driven exfoliant load',
    'Inactivated above 60°C — do not heat above 40°C in formulation',
    'Do not use on broken or severely compromised skin — enzyme activity increases penetration',
    'Avoid near eyes',
  ],
  'papain': [
    'Avoid combining with AHAs/BHAs at high concentrations — compounded enzymatic + acid exfoliation',
    'Inactivated above 65°C — keep below 40°C in formulation',
    'Avoid on broken skin',
    'Latex allergy cross-reactivity possible for papaya-sensitive individuals',
  ],

  // ── Retinol (already done) ───────────────────────────────────────────────────

  // ── Birch Sap ────────────────────────────────────────────────────────────────
  'birch-sap-extract': [
    'Avoid high heat in formulation — volatile bioactives degrade',
    'Generally very compatible — one of the gentlest botanical waters',
  ],

  // ── Argan / Other Stable Oils ────────────────────────────────────────────────
  'argan-oil': [
    'High oleic acid content — may be heavy for very oily skin at high concentrations',
    'Generally very stable — one of the longer shelf-life oils with antioxidant tocopherols naturally present',
  ],
  'jojoba-oil': [
    'Technically a wax ester, not an oil — exceptional stability with very low sensitization risk',
    'Virtually no incompatibilities — one of the most universally compatible carrier "oils"',
  ],
  'marula-oil': [
    'High oleic acid — may feel heavy for very oily skin at high concentrations',
    'Generally very stable and compatible — naturally high in antioxidants',
  ],
  'baobab-oil': [
    'Thick texture — blend with lighter oils for facial formulas',
    'Generally very compatible and stable',
  ],

  // ── Citric Acid ──────────────────────────────────────────────────────────────
  'citric-acid': [
    'pH adjuster primarily — at high concentrations it becomes a mild AHA exfoliant',
    'At concentrations above 5% as active, separate from retinoids as you would any AHA',
    'Avoid at very high concentrations near eyes',
  ],

  // ── Azelaic / Salicylic already done ─────────────────────────────────────────

};

// ─── Apply incompatibilities to all ingredients ───────────────────────────────
let updatedCount = 0;
let skippedCount = 0;

data.ingredients.forEach(ingredient => {
  const slug = ingredient.slug;

  // Convert existing strings to arrays
  if (typeof ingredient.incompatibilities === 'string') {
    if (ingredient.incompatibilities.trim() === '') {
      ingredient.incompatibilities = [];
    } else {
      // Strip HTML tags and convert to array
      const cleaned = ingredient.incompatibilities
        .replace(/<[^>]*>/g, '')
        .replace(/\n+/g, ' ')
        .trim();
      ingredient.incompatibilities = [cleaned];
    }
  }

  // If there's a specific map entry, use it
  if (incompatMap[slug]) {
    ingredient.incompatibilities = incompatMap[slug];
    updatedCount++;
  } else if (!ingredient.incompatibilities || ingredient.incompatibilities.length === 0) {
    // Apply sensible defaults based on ingredient category / properties
    const defaults = getDefaultIncompatibilities(ingredient);
    ingredient.incompatibilities = defaults;
    skippedCount++;
  }
});

function getDefaultIncompatibilities(ingredient) {
  const cat = (ingredient.category || '').toLowerCase();
  const name = (ingredient.name || '').toLowerCase();
  const primaryFn = (ingredient.primaryFunction || '').toLowerCase();

  // Essential oils
  if (cat.includes('essential oil') || name.includes('essential oil')) {
    return [
      'Fragrance component — IFRA-regulated; flag for sensitive and reactive skin',
      'Do not exceed recommended use concentration for product type (leave-on vs rinse-off)',
      'Check for individual fragrance allergens (linalool, geraniol, limonene) in full ingredient disclosure',
    ];
  }

  // Botanicals / extracts — generally compatible
  if (cat.includes('botanical') || cat.includes('extract') || cat.includes('herbal')) {
    return [
      'Generally well-tolerated at cosmetic use concentrations',
      'Avoid at very low pH (below 3.5) — phenolic compounds and bioactives may degrade',
      'Patch test recommended for individuals with known botanical sensitivities',
    ];
  }

  // Oils / butters
  if (cat.includes('oil') || cat.includes('butter') || cat.includes('emollient')) {
    return [
      'Keep below 40°C during formulation — heat degrades fatty acid profile',
      'Requires antioxidant stabilization (Tocopherol) if high in polyunsaturated fatty acids',
      'May be comedogenic at high concentrations for acne-prone skin — assess fatty acid profile',
    ];
  }

  // Peptides
  if (cat.includes('peptide') || primaryFn.includes('peptide')) {
    return [
      'Avoid very low pH formulas (below 4) — peptide bond stability concern',
      'Do not combine with benzoyl peroxide — oxidizes peptide bonds',
      'Generally compatible with niacinamide, hyaluronic acid, ceramides, and most actives at pH 4.5–7',
    ];
  }

  // Actives / vitamins
  if (cat.includes('vitamin') || cat.includes('antioxidant')) {
    return [
      'Avoid combining with strong oxidizing agents',
      'Check pH stability range for specific vitamin form being used',
      'Generally compatible with most standard cosmetic actives',
    ];
  }

  // Ferments
  if (cat.includes('ferment') || name.includes('ferment') || name.includes('probiotic')) {
    return [
      'Avoid at very low pH (below 3.5) — bioactives in ferment filtrate degrade under extreme acidity',
      'Keep below 40°C during formulation — heat-sensitive bioactives',
      'Generally compatible with barrier-repair, hydrating, and anti-aging actives',
    ];
  }

  // Humectants / hydrators
  if (cat.includes('humectant') || primaryFn.includes('humectant')) {
    return [
      'Always follow with an occlusive or emollient in dry climates to prevent transepidermal moisture loss',
      'Avoid very high alcohol concentrations in same formula — alcohol dehydration works against humectant function',
      'Generally very compatible with all actives',
    ];
  }

  // Mushrooms / adaptogens
  if (name.includes('mushroom') || cat.includes('adaptogen') || name.includes('reishi') || name.includes('chaga')) {
    return [
      'Avoid at very low pH — polysaccharide beta-glucan content degrades under extreme acidity',
      'Generally very compatible — used primarily as antioxidant and immune-modulating botanical',
    ];
  }

  // Default for everything else
  return [
    'Generally well-tolerated at recommended cosmetic use concentrations',
    'Always patch test for individuals with known sensitivities to this botanical family',
  ];
}

// ─── Write output ─────────────────────────────────────────────────────────────
data.lastUpdated = new Date().toISOString().split('T')[0];
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('✅ Incompatibilities populated');
console.log('Specific map applied:', updatedCount, 'ingredients');
console.log('Default applied:', skippedCount, 'ingredients');
console.log('Total:', data.ingredients.length);

// Verify
const stillEmpty = data.ingredients.filter(i => !i.incompatibilities || i.incompatibilities.length === 0);
console.log('Still empty:', stillEmpty.length);
if (stillEmpty.length > 0) console.log('Empty:', stillEmpty.map(i => i.slug));
