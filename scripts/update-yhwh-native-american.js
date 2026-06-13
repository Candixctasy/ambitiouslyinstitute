#!/usr/bin/env node
/**
 * Adds yhwhBeloved flag, expands Native American traditions,
 * and adds missing YHWH-commanded + Native American sacred ingredients.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../bybobo/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ─── 1. Add yhwhBeloved field to every existing ingredient (default false) ───
data.ingredients.forEach(i => {
  if (!('yhwhBeloved' in i)) i.yhwhBeloved = false;
});

// ─── 2. YHWH-commanded/beloved slugs (Torah: Exodus 30, Leviticus 14,
//        Numbers 19, Psalm 45, Song of Songs) ───────────────────────────────
const yhwhBelovedSlugs = new Set([
  'myrrh-extract',           // Exodus 30:23 — 500 shekels pure myrrh
  'frankincense-extract',    // Exodus 30:34, Leviticus 2:1-2
  'hyssop-extract',          // Leviticus 14:4, Numbers 19:6 purification
  'cedarwood-extract',       // Leviticus 14:4 alongside hyssop
  'spikenard-extract',       // Song of Songs 1:12, Temple worship fragrance
  'pomegranate-extract',     // Exodus 28:33-34 (Aaron's robe), Temple pillars
  'pomegranate-oil',         // same sacred fruit
  'aloe-vera',               // Numbers 24:6, Psalm 45:8
  'aloe-vera-gel',           // same plant
  'rose-damascena-extract',  // Song of Songs 2:1 "Rose of Sharon"
]);

data.ingredients.forEach(i => {
  if (yhwhBelovedSlugs.has(i.slug)) {
    i.yhwhBeloved = true;
    i.sacredBiblical = true;
    i.sacredAncient = true;
    if (!i.sacredTraditions) i.sacredTraditions = [];
    if (!i.sacredTraditions.includes('Ancient Hebrew / Torah')) {
      i.sacredTraditions.push('Ancient Hebrew / Torah');
    }
  }
});

// ─── 3. Expand Native American traditions on existing ingredients ─────────
const nativeAmericanSlugs = {
  'yarrow-extract':          'Native American sacred',
  'echinacea-extract':       'Native American sacred',
  'willow-bark-extract':     'Native American sacred',
  'elderberry-extract':      'Native American sacred',
  'labrador-tea-extract':    'Native American sacred',
  'chaga-mushroom-extract':  'Native American sacred',
  'cedarwood-extract':       'Native American sacred',
  'birch-sap-extract':       'Native American sacred',
  'ashwagandha-extract':     'Native American sacred', // not really — skip in logic below
};

// More precise mapping
const nativeAmTradition = 'Native American sacred';
const nativeAmSlugsSet = new Set([
  'yarrow-extract',
  'echinacea-extract',
  'willow-bark-extract',
  'elderberry-extract',
  'labrador-tea-extract',
  'chaga-mushroom-extract',
  'cedarwood-extract',
  'birch-sap-extract',
]);

data.ingredients.forEach(i => {
  if (nativeAmSlugsSet.has(i.slug)) {
    if (!i.sacredTraditions) i.sacredTraditions = [];
    if (!i.sacredTraditions.includes(nativeAmTradition)) {
      i.sacredTraditions.push(nativeAmTradition);
    }
    i.sacredAncient = true;
  }
});

// ─── 4. New ingredients to add ───────────────────────────────────────────

const newIngredients = [

  // ── YHWH Holy Anointing Oil (Exodus 30:22-25) ──────────────────────────

  {
    slug: 'olive-oil',
    name: 'Olive Oil',
    inciName: 'Olea Europaea (Olive) Fruit Oil',
    category: 'Emollient / Carrier Oil',
    sourceForm: 'Cold-pressed virgin oil',
    processingMethod: 'Cold-pressed',
    origin: 'Olea europaea fruit — Mediterranean, Middle East, Israel',
    primaryFunction: 'Deep emollient, skin barrier restoration, antioxidant protection',
    secondaryFunctions: ['Occlusive', 'Anti-inflammatory', 'Antioxidant', 'Wound healing'],
    bestForConcerns: ['Dry skin', 'Mature skin', 'Eczema', 'Inflamed skin', 'Cracked skin', 'Barrier damage'],
    bestForSkinTypes: ['Dry', 'Mature', 'Normal'],
    useCases: ['Body oils', 'Hair treatments', 'Balms', 'Cleansing oils', 'Massage oils', 'Salves'],
    maxUseLevel: '100%',
    heatSensitive: true,
    solubility: 'Oil-soluble',
    irritationRisk: 'Low',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: false,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: false,
    ancientIngredient: true,
    coldPressed: true,
    raw: true,
    sacredBiblical: true,
    sacredAncient: true,
    yhwhBeloved: true,
    sacredTraditions: [
      'Ancient Hebrew / Torah',
      'Ancient Greek',
      'Ancient Roman',
      'Ancient Egyptian',
      'Ayurvedic',
      'Mediterranean sacred'
    ],
    educationWhat: 'Olive oil is a rich emollient pressed from Olea europaea fruit, loaded with oleic acid (55–85%), squalene, and antioxidant polyphenols. It has nourished skin and hair across civilizations for over 6,000 years.',
    educationWhere: 'Grown throughout the Mediterranean basin, the Levant (modern Israel, Palestine, Jordan, Lebanon), North Africa, and southern Europe. Israel\'s olive groves are among the most ancient in the world — some trees in Gethsemane are estimated at over 900 years old.',
    educationHow: 'Cold-pressed extraction from ripe olives preserves heat-sensitive polyphenols, oleocanthal, and squalene. Extra-virgin grade retains the highest bioactive content. Used as both a standalone skin treatment and a carrier for botanical infusions.',
    educationWhy: 'Oleic acid\'s small molecular profile allows deep skin penetration, restoring lipid layers and preventing transepidermal water loss. Hydroxytyrosol and oleuropein polyphenols deliver measurable antioxidant protection against UV-induced oxidative stress.',
    educationWhen: 'Ideal for body oils, nighttime face oils for mature or dry skin, cleansing balms, lip treatments, and scalp conditioning. Best applied to slightly damp skin to lock in moisture. Use organic cold-pressed for best results.',
    consumerAnalogy: 'Think of olive oil as the original luxury skincare oil — liquid gold that has softened skin since ancient times, from Mediterranean queens to Temple priests.',
    professionalAnalogy: 'A high-oleic carrier with a fatty acid profile that mirrors the skin\'s natural sebum; used at 1–30% in emollients and cleansing oils for barrier repair and lipid replenishment.',
    transparencyStatement: 'Certified organic, cold-pressed, extra-virgin where possible. Rich in oleic acid, squalene, and polyphenols. No hexane extraction. Heavy — best blended with lighter oils for face formulations.',
    historicalUseNotes: 'YHWH commanded olive oil as the base of the Holy Anointing Oil in Exodus 30:24 — "a hin of olive oil." Priests and kings were anointed with olive oil. Kings David and Solomon were anointed with it. Psalm 23:5 — "you anoint my head with oil." Used in Temple lamp fuel (Exodus 27:20), grain offerings (Leviticus 2:1), and skin anointing throughout the Torah. Ancient Egyptians used it in cosmetic ointments. Greeks and Romans used it in athletic training and bathing. One of humanity\'s oldest cultivated plants.',
    incompatibilities: ['Avoid in formulations requiring very light texture', 'Can comedogenically challenge acne-prone skin in high concentrations'],
    canadianRelevance: 'Imported — not grown in Canada but widely available through Canadian fair-trade suppliers and certified organic sources. Standard in Canadian artisan skincare.'
  },

  {
    slug: 'cinnamon-bark-extract',
    name: 'Cinnamon Bark Extract',
    inciName: 'Cinnamomum zeylanicum (Cinnamon) Bark Extract',
    category: 'Botanical / Antimicrobial',
    sourceForm: 'Steam-distilled essential oil or CO2 extract',
    processingMethod: 'Steam distillation / CO2 extraction',
    origin: 'Cinnamomum zeylanicum bark — Sri Lanka, India, ancient Spice Routes',
    primaryFunction: 'Antimicrobial, warming circulation-stimulant, antioxidant',
    secondaryFunctions: ['Anti-inflammatory', 'Antifungal', 'Preservative-boosting', 'Scalp stimulant'],
    bestForConcerns: ['Scalp health', 'Antimicrobial needs', 'Sluggish circulation', 'Antioxidant protection', 'Acne'],
    bestForSkinTypes: ['Oily', 'Acne-prone', 'Normal'],
    useCases: ['Scalp serums', 'Hair growth formulas', 'Lip plumpers (low %)', 'Antimicrobial formulas', 'Beard oils'],
    maxUseLevel: '0.5% (essential oil — sensitizing above this)',
    heatSensitive: true,
    solubility: 'Oil-soluble (essential oil) / Water-soluble (hydro extract)',
    irritationRisk: 'Moderate-High',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: false,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: false,
    ancientIngredient: true,
    coldPressed: false,
    raw: false,
    sacredBiblical: true,
    sacredAncient: true,
    yhwhBeloved: true,
    sacredTraditions: [
      'Ancient Hebrew / Torah',
      'Ancient Egyptian',
      'Ayurvedic',
      'Ancient Chinese',
      'Ancient Spice Routes sacred'
    ],
    educationWhat: 'Cinnamon bark extract comes from Cinnamomum zeylanicum (true cinnamon / Ceylon cinnamon), rich in cinnamaldehyde, eugenol, and linalool. It delivers powerful antimicrobial, antioxidant, and circulation-stimulating activity. One of the world\'s most ancient and sacred spices.',
    educationWhere: 'Native to Sri Lanka and southern India. Traded along ancient spice routes through Arabia to Israel, Egypt, and Greece. So rare and precious in ancient times it was worth more than gold by weight.',
    educationHow: 'Steam distillation of the inner bark (not the cassia outer bark) yields the essential oil. Used in formulations at very low concentrations (0.05–0.5%) for antimicrobial and circulation benefits. Acts as a natural preservative booster in cosmetic formulas.',
    educationWhy: 'Cinnamaldehyde inhibits bacterial and fungal growth by disrupting cell membranes. It also stimulates blood flow, making it effective in scalp serums for hair growth. Antioxidant polyphenols protect against oxidative skin aging.',
    educationWhen: 'Best for scalp treatments, beard oils, lip-plumping formulas (very low %), or antimicrobial boosters. Avoid on sensitive or inflamed skin. Always dilute — the essential oil is a known sensitizer at higher concentrations.',
    consumerAnalogy: 'Think of cinnamon bark extract as the sacred spice king — a warming, protective botanical so precious in ancient times it was literally worth more than gold, now delivering antimicrobial and circulation benefits to your scalp and skin.',
    professionalAnalogy: 'A cinnamaldehyde-rich botanical used at 0.05–0.5% for preservative-boosting and circulation stimulation. High sensitization potential requires IFRA/RIFM compliance review before use in leave-on formulations.',
    transparencyStatement: 'True Ceylon cinnamon (C. zeylanicum), not cassia (C. cassia / aromaticum). Organically sourced. Cinnamal content is a known sensitizer — formulated responsibly at safe use levels. Not for use on broken or inflamed skin.',
    historicalUseNotes: 'YHWH commanded cinnamon in the Holy Anointing Oil: Exodus 30:23 — "250 shekels of sweet cinnamon (kinamon)." One of only 5 ingredients YHWH specified. Ancient Egyptians used cinnamon in embalming and sacred oils. Listed in Song of Songs 4:14 as a prized garden spice of the beloved. So rare in ancient Israel it arrived via caravan from the East, making it a mark of royalty and holiness. Herodotus wrote that cinnamon was guarded by "great winged birds" and could only be obtained through special effort — such was its mystique.',
    incompatibilities: ['Avoid with sensitive/reactive skin', 'Do not combine with high concentrations of other sensitizing actives', 'Keep below 0.5% in leave-on products'],
    canadianRelevance: 'Imported spice and botanical extract available through Canadian certified organic suppliers. Widely used in Canadian artisan hair care and scalp products.'
  },

  {
    slug: 'cassia-extract',
    name: 'Cassia Extract',
    inciName: 'Cinnamomum cassia (Cassia) Bark Extract',
    category: 'Botanical / Antimicrobial',
    sourceForm: 'CO2 extract or steam-distilled essential oil',
    processingMethod: 'CO2 extraction / Steam distillation',
    origin: 'Cinnamomum cassia bark — China, Southeast Asia, ancient spice trade',
    primaryFunction: 'Antimicrobial, warming, antioxidant, circulation-stimulating',
    secondaryFunctions: ['Anti-inflammatory', 'Antifungal', 'Astringent', 'Preservative-boosting'],
    bestForConcerns: ['Antimicrobial', 'Scalp circulation', 'Antioxidant protection', 'Oily skin', 'Dandruff'],
    bestForSkinTypes: ['Oily', 'Normal', 'Combination'],
    useCases: ['Scalp treatments', 'Hair growth serums', 'Antimicrobial formulas', 'Beard oils'],
    maxUseLevel: '0.2% (highly sensitizing — use with caution)',
    heatSensitive: true,
    solubility: 'Oil-soluble',
    irritationRisk: 'High',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: false,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: false,
    ancientIngredient: true,
    coldPressed: false,
    raw: false,
    sacredBiblical: true,
    sacredAncient: true,
    yhwhBeloved: true,
    sacredTraditions: [
      'Ancient Hebrew / Torah',
      'Ancient Chinese',
      'Ancient Egyptian',
      'Ayurvedic',
      'Ancient Spice Routes sacred'
    ],
    educationWhat: 'Cassia (Cinnamomum cassia) is the Chinese cinnamon, producing a bark extract richer in cinnamaldehyde than Ceylon cinnamon. It carries powerful antimicrobial, antifungal, and warming properties and is one of the oldest medicinal spices known to humanity.',
    educationWhere: 'Native to southern China and Southeast Asia. Traded throughout the ancient spice routes, reaching Israel, Egypt, and the Mediterranean thousands of years before the Common Era. In ancient times the word "cassia" (kiddah in Hebrew) referred to this specific aromatic bark.',
    educationHow: 'CO2 extraction preserves the full spectrum of aromatic compounds including cinnamaldehyde, p-cymene, and linalool. Used at very low concentrations in cosmetics for antimicrobial, warming, and sensory effects. Must be diluted in a carrier oil or emulsion base.',
    educationWhy: 'Cinnamaldehyde acts as a broad-spectrum antimicrobial, inhibiting Staphylococcus aureus, Candida albicans, and other skin pathogens. Warming sensation aids scalp blood flow for follicle stimulation. Antioxidant polyphenols protect against lipid peroxidation.',
    educationWhen: 'Ideal in scalp serums, dandruff treatments, beard grooming oils, and antimicrobial boosters. Use extreme caution with sensitive skin — patch test essential. Not suitable for leave-on facial products without extensive safety testing.',
    consumerAnalogy: 'Cassia extract is the ancient sacred bark that purified temples, annointed kings, and protected skin for millennia — a powerfully protective botanical from the spice roads of antiquity.',
    professionalAnalogy: 'High-cinnamaldehyde botanical extract for antimicrobial use at 0.05–0.2%. IFRA/REACH regulated due to sensitization potential. Consider encapsulation or PEG-modification for reduced irritation in leave-on formulas.',
    transparencyStatement: 'Cinnamomum cassia, not to be confused with Ceylon cinnamon. Organically sourced. High irritation potential requires professional formulation expertise. Not recommended for sensitive skin. Maximum use levels strictly observed.',
    historicalUseNotes: 'YHWH commanded cassia as the fourth ingredient in the Holy Anointing Oil: Exodus 30:24 — "500 shekels of cassia (kiddah)." This was the largest quantity of any single spice in the formula. Psalm 45:8 — "All your robes are fragrant with myrrh and aloes and cassia." Ancient Chinese medicine has used cassia bark for over 4,000 years. Dioscorides (1st century CE) described cassia as one of the world\'s most prized medicinal spices. Used in ancient Egyptian temple rites and embalming formulas.',
    incompatibilities: ['Highly sensitizing — never use undiluted', 'Avoid on sensitive, reactive, or inflamed skin', 'Do not combine with other high-sensitization actives'],
    canadianRelevance: 'Imported — available through Canadian organic ingredient suppliers. Used in professional-grade Canadian scalp care and aromatherapy formulations.'
  },

  {
    slug: 'calamus-extract',
    name: 'Calamus / Sweet Flag Extract',
    inciName: 'Acorus calamus (Sweet Flag) Root Extract',
    category: 'Botanical / Sacred',
    sourceForm: 'CO2 extract or dried root powder',
    processingMethod: 'CO2 extraction / Solvent extraction',
    origin: 'Acorus calamus root — India, Eastern Europe, North America wetlands',
    primaryFunction: 'Calming, anti-inflammatory, aromatic carrier in sacred formulas',
    secondaryFunctions: ['Antimicrobial', 'Analgesic', 'Antioxidant', 'Nervine', 'Scalp conditioning'],
    bestForConcerns: ['Scalp health', 'Anti-inflammatory', 'Sacred / ritual skincare', 'Calm irritated skin', 'Aromatic formulas'],
    bestForSkinTypes: ['All', 'Sensitive', 'Mature'],
    useCases: ['Sacred skincare', 'Scalp oils', 'Ritual perfumes', 'Botanical hair oils', 'Aromatherapy blends'],
    maxUseLevel: '1% (CO2 extract)',
    heatSensitive: true,
    solubility: 'Oil-soluble / Water-soluble depending on extraction',
    irritationRisk: 'Low-Moderate',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: true,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: true,
    ancientIngredient: true,
    coldPressed: false,
    raw: false,
    sacredBiblical: true,
    sacredAncient: true,
    yhwhBeloved: true,
    sacredTraditions: [
      'Ancient Hebrew / Torah',
      'Ayurvedic',
      'Native American sacred',
      'Ancient Chinese',
      'Ancient Greek',
      'Ancient Egyptian'
    ],
    educationWhat: 'Calamus (Acorus calamus), also called Sweet Flag, is an aromatic wetland plant with a warm, spicy, woody scent. Its root extract contains beta-asarone, acorone, and terpenes with documented anti-inflammatory, antimicrobial, and nerve-calming properties. It grows wild in Canadian wetlands.',
    educationWhere: 'Found throughout temperate wetlands: India (used in Ayurveda as "vacha"), China (used in TCM as "shui chang pu"), Eastern Europe (Tartarian folk medicine), and across North America where First Nations peoples used it as medicine. Canada has wild calamus populations from coast to coast.',
    educationHow: 'Root rhizomes are harvested, dried, and CO2-extracted to preserve bioactive terpenes. Used as a low-percentage active in scalp oils, botanical perfumes, and sacred skincare formulas. Its warm, sweet-spicy aroma makes it a natural fixative in fragrance blends.',
    educationWhy: 'Beta-asarone delivers anti-inflammatory and antimicrobial effects. Calamus soothes irritated scalp tissue and supports blood flow to follicles. Its aromatic compounds act as natural fixatives in botanical perfume work, extending fragrance longevity.',
    educationWhen: 'Best in sacred skincare formulas, ritual anointing oils, scalp-focused botanical treatments, and aromatic botanical perfume blends. A small amount goes a long way — its scent profile is distinctive and powerful.',
    consumerAnalogy: 'Think of calamus as the sacred aromatic root that YHWH himself chose for the most holy anointing formula — a plant so revered it grew in temple gardens, Ayurvedic pharmacopeias, and indigenous North American medicine simultaneously.',
    professionalAnalogy: 'A beta-asarone-containing rhizome extract with fixative aromatic properties and anti-inflammatory activity. Used at 0.5–1% in oil-based formulas. Note: asarone content varies by species — source from reputable suppliers specifying Acorus calamus for cosmetic use.',
    transparencyStatement: 'Wild-crafted or organic calamus root extract. Canadian-sourced where possible from sustainable wetland harvesting. Calamus has a complex regulatory history — formulated in compliance with current cosmetic regulations. Not for internal use.',
    historicalUseNotes: 'YHWH commanded "fragrant cane" (kaneh bosem — קָנֶה בֹשֶׂם) as the third spice in the Holy Anointing Oil: Exodus 30:23 — "250 shekels of fragrant cane." Many Torah scholars and historians identify kaneh bosem as calamus (Acorus calamus). Used in Ayurveda as vacha for thousands of years for memory, speech, and nervous system support. First Nations peoples across North America chewed calamus root for respiratory conditions and used it in ceremonial preparations. Ancient Chinese TCM called it one of the "50 fundamental herbs." Tatars and Eastern European folk healers used it as a protective plant. Truly global sacred herb.',
    incompatibilities: ['Avoid with known asarone sensitivity', 'Use within regulatory limits for cosmetic applications'],
    canadianRelevance: 'Wild calamus grows throughout Canadian wetlands (Ontario, Quebec, Atlantic provinces, BC). One of the few Torah-sacred plants with genuine Canadian wild-crafted availability. Indigenous Nations across Canada have used it in traditional medicine for centuries.'
  },

  {
    slug: 'galbanum-resin',
    name: 'Galbanum Resin Extract',
    inciName: 'Ferula galbaniflua (Galbanum) Resin Extract',
    category: 'Botanical Resin / Sacred Aromatic',
    sourceForm: 'Resin extract / CO2 extract',
    processingMethod: 'Solvent extraction / CO2 extraction of resin exudate',
    origin: 'Ferula galbaniflua stems — Persia (Iran), Central Asia, Middle East',
    primaryFunction: 'Anti-inflammatory, wound healing, aromatic fixative in sacred perfume formulas',
    secondaryFunctions: ['Antifungal', 'Antibacterial', 'Skin regenerating', 'Analgesic', 'Antioxidant'],
    bestForConcerns: ['Wound healing', 'Anti-inflammatory', 'Sacred / ritual skincare', 'Mature skin', 'Scar tissue'],
    bestForSkinTypes: ['Mature', 'Dry', 'Normal', 'Damaged'],
    useCases: ['Sacred anointing oils', 'Wound healing salves', 'Perfume fixatives', 'Ritual skincare', 'Anti-aging serums'],
    maxUseLevel: '1%',
    heatSensitive: true,
    solubility: 'Oil-soluble',
    irritationRisk: 'Low',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: true,
    organic: false,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: false,
    ancientIngredient: true,
    coldPressed: false,
    raw: true,
    sacredBiblical: true,
    sacredAncient: true,
    yhwhBeloved: true,
    sacredTraditions: [
      'Ancient Hebrew / Torah',
      'Ancient Persian',
      'Ancient Greek',
      'Ancient Egyptian',
      'Ancient Roman'
    ],
    educationWhat: 'Galbanum is a precious resinous gum exuded from Ferula galbaniflua, a giant fennel species native to Persia. The resin is rich in pinene, cadinene, and undecyl-3-butenyl ketone, giving it powerful anti-inflammatory, wound-healing, and aromatic properties. One of the rarest sacred resins.',
    educationWhere: 'Harvested by scoring the stems of Ferula galbaniflua plants in Iran, Afghanistan, and the Levant. The resin bleeds out naturally and is collected. Ancient supply routes ran from Persia through the Spice Roads to Israel and Egypt. Still harvested using traditional methods today.',
    educationHow: 'Raw resin is collected from plant stems, then solvent-extracted or CO2-extracted to produce a standardized cosmetic ingredient. Used at very low concentrations in perfumery as a fixative that prevents top notes from volatilizing too quickly. In skincare it delivers anti-inflammatory and regenerative effects.',
    educationWhy: 'Galbanum\'s monoterpene and sesquiterpene content provides anti-inflammatory effects comparable to pharmaceutical references in some studies. Its wound-healing properties accelerate tissue regeneration. In sacred perfumery its unique green, earthy, balsamic note is irreplaceable.',
    educationWhen: 'Best in sacred skincare formulas, wound-healing balms, ritual anointing oils, and artisan natural perfumes. A classic fixative in fine fragrance — a tiny amount extends the life of an entire blend. Use at 0.1–0.5% in functional skincare.',
    consumerAnalogy: 'Galbanum is the mysterious sacred resin YHWH commanded for the Holy Incense — rare, ancient, almost impossible to replicate synthetically, with a green-earthy-balsamic note and genuine healing power.',
    professionalAnalogy: 'A monoterpene-rich resin extract for perfumery (fixative) and anti-inflammatory formulation. Unique green-woody odor profile — one of the few natural fixatives with genuine chemical anchoring of top notes. Use at 0.1–1% depending on application.',
    transparencyStatement: 'Wild-harvested from traditional Persian/Iranian sources using sustainable resin-tapping methods. One of the world\'s rarest botanical cosmetic ingredients. Non-toxic, non-sensitizing at recommended use levels.',
    historicalUseNotes: 'YHWH commanded galbanum as one of four sacred spices in the Holy Temple Incense: Exodus 30:34 — "Take sweet spices, stacte, onycha, and galbanum (chelbenah — חֶלְבְּנָה), these sweet spices with pure frankincense." The ancient Israelites burned this incense before YHWH daily — it was the sacred scent of the Tabernacle and Temple. Hippocrates (460 BCE) documented galbanum for wound healing and inflammation. Dioscorides listed it in Materia Medica. Ancient Egyptians used it in kyphi (sacred temple incense). Truly one of the rarest and holiest botanical ingredients on earth.',
    incompatibilities: ['Can be a skin sensitizer in rare cases — patch test recommended', 'Avoid synthetic fragrance combinations that may destabilize the resin'],
    canadianRelevance: 'Imported from Iran and the Middle East. Available through specialty natural perfumery and botanical ingredient suppliers worldwide. Used in artisan Canadian sacred and natural perfumery.'
  },

  // ── Native American Sacred Plants ─────────────────────────────────────

  {
    slug: 'sweetgrass-extract',
    name: 'Sweetgrass Extract',
    inciName: 'Hierochloe odorata (Sweetgrass) Leaf Extract',
    category: 'Botanical / Sacred Native American',
    sourceForm: 'Hydro-glycerin extract or infused oil',
    processingMethod: 'Hydro-glycerin extraction or slow oil infusion',
    origin: 'Hierochloe odorata — North American prairies, Canadian boreal regions',
    primaryFunction: 'Anti-inflammatory, antioxidant, calming, sacred ceremonial herb',
    secondaryFunctions: ['Antimicrobial', 'Humectant (glycerin carrier)', 'Skin-soothing', 'Aromatic'],
    bestForConcerns: ['Sensitive skin', 'Inflammation', 'Redness', 'Sacred skincare', 'Antioxidant protection', 'Calming'],
    bestForSkinTypes: ['Sensitive', 'Normal', 'Combination', 'All'],
    useCases: ['Sacred skincare serums', 'Toners', 'Calming face mists', 'Ritual body oils', 'Indigenous-inspired formulas'],
    maxUseLevel: '5% (extract)',
    heatSensitive: true,
    solubility: 'Water-soluble (hydro-glycerin) / Oil-soluble (oil infusion)',
    irritationRisk: 'Very Low',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: true,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: true,
    ancientIngredient: true,
    coldPressed: false,
    raw: true,
    sacredBiblical: false,
    sacredAncient: true,
    yhwhBeloved: false,
    sacredTraditions: [
      'Native American sacred',
      'First Nations Canadian sacred',
      'Plains Nations sacred',
      'Ojibwe sacred',
      'Cree sacred',
      'Lakota sacred',
      'Métis traditional'
    ],
    educationWhat: 'Sweetgrass (Hierochloe odorata) is a sacred ceremonial grass revered across virtually all North American Indigenous cultures. Its vanilla-like coumarin scent comes from coumarin glycosides that also deliver antioxidant and anti-inflammatory activity in skincare applications.',
    educationWhere: 'Grows throughout the Canadian prairies, boreal forests, and Great Plains of North America. Sacred to the Cree, Ojibwe, Lakota, Blackfoot, Anishinaabe, Mi\'kmaq, and many other Nations. Harvested in long braids, it is one of the Four Sacred Plants alongside tobacco, cedar, and sage.',
    educationHow: 'Traditionally braided and burned as smudge, or infused in carrier oils and water for topical use. For cosmetic extraction, fresh or dried grass is extracted via slow oil infusion or hydro-glycerin methods to capture coumarin compounds, flavonoids, and aromatic constituents.',
    educationWhy: 'Coumarin compounds in sweetgrass have demonstrated anti-inflammatory and antioxidant activity in research settings. The calming aroma has well-documented psychophysiological effects — reducing cortisol and supporting nervous system balance. A genuinely calming sacred botanical for skin and spirit.',
    educationWhen: 'Beautiful in ceremonial or sacred-themed skincare lines, calming toners, face mists, ritual body oils, and smudge-inspired aromatic products. Aligns with Indigenous-inspired beauty concepts when sourced with respect and community partnership.',
    consumerAnalogy: 'Sweetgrass is the sacred braided grass that Indigenous peoples across Canada and the US have burned to invite positive energy for thousands of years — now bringing its calming, antioxidant power to your skincare ritual.',
    professionalAnalogy: 'A coumarin-bearing aromatic grass extract with anti-inflammatory flavonoids. Used at 1–5% in hydro-glycerin or oil-infusion form. Unique aromatic and spiritual positioning for Indigenous-inspired luxury skincare lines. Source ethically — partner with Indigenous harvesters.',
    transparencyStatement: 'Wild-crafted in Canadian prairies in partnership with Indigenous harvesters. One of the Four Sacred Plants of many First Nations. Sourced with deep cultural respect — we do not claim ownership of this plant\'s sacred traditions. Benefit-sharing with source communities.',
    historicalUseNotes: 'Sweetgrass is one of the Four Sacred Plants in numerous Indigenous North American traditions (alongside tobacco, cedar, and sage). The Cree call it "Wiiskaapimizh." The Ojibwe "Mashkodewashk." Burned to purify space and invite positive spiritual energy. Used in healing ceremonies, smudging rituals, and passed down through generations as one of the most precious gifts of the land. In skincare it represents a connection to the land, the ancestors, and the healing intelligence of North American botanicals.',
    incompatibilities: ['Coumarin content — check applicable regulatory limits for leave-on products (IFRA/EU)'],
    canadianRelevance: 'Deeply Canadian — grows in every province and territory. One of the sacred plants of First Nations peoples from coast to coast. Canadian artisan brands committed to reconciliation can partner with Indigenous communities for ethical harvesting. Arguably the most distinctly Canadian sacred botanical.'
  },

  {
    slug: 'uva-ursi-extract',
    name: 'Bearberry / Uva Ursi Extract',
    inciName: 'Arctostaphylos uva-ursi (Bearberry) Leaf Extract',
    category: 'Botanical / Brightening',
    sourceForm: 'Standardized arbutin extract or water-glycerin extract',
    processingMethod: 'Water or hydro-glycerin extraction',
    origin: 'Arctostaphylos uva-ursi leaves — Canada, Northern US, Northern Europe, Siberia',
    primaryFunction: 'Skin brightening, hyperpigmentation reduction via natural arbutin',
    secondaryFunctions: ['Antioxidant', 'Antimicrobial', 'Anti-inflammatory', 'Astringent'],
    bestForConcerns: ['Hyperpigmentation', 'Dark spots', 'Uneven skin tone', 'Post-inflammatory hyperpigmentation', 'Sun spots'],
    bestForSkinTypes: ['All', 'Oily', 'Combination', 'Mature'],
    useCases: ['Brightening serums', 'Dark spot treatments', 'Even-tone toners', 'Exfoliating formulas', 'Pigmentation creams'],
    maxUseLevel: '3%',
    heatSensitive: false,
    solubility: 'Water-soluble',
    irritationRisk: 'Low',
    isPublished: true,
    vegan: true,
    glutenFree: true,
    wildcrafted: true,
    organic: true,
    crueltyFree: true,
    ethicallySourced: true,
    biodegradable: true,
    canadianSourced: true,
    ancientIngredient: true,
    coldPressed: false,
    raw: false,
    sacredBiblical: false,
    sacredAncient: true,
    yhwhBeloved: false,
    sacredTraditions: [
      'Native American sacred',
      'First Nations Canadian sacred',
      'Cree traditional medicine',
      'Ojibwe traditional medicine',
      'Plains Nations traditional medicine',
      'Siberian traditional medicine',
      'Celtic traditional medicine'
    ],
    educationWhat: 'Bearberry (Arctostaphylos uva-ursi) leaves contain arbutin (a natural glycoside that inhibits tyrosinase) making it one of nature\'s most effective and gentle skin brighteners. Also rich in hydroquinone glycosides, flavonoids, and tannins. Called "kinnikinnick" by many First Nations peoples.',
    educationWhere: 'A hardy shrub of the boreal forest and northern tundra — grows abundantly across Canada from Labrador to British Columbia. Also found in Scandinavia, Siberia, and northern Europe. A truly circumpolar plant with deep Indigenous medical history on multiple continents.',
    educationHow: 'Leaves are harvested in autumn when arbutin content peaks, then water or hydro-glycerin extracted. The resulting extract contains a standardized percentage of arbutin — the key brightening compound. Can also be steam-extracted to produce a hydrosol component.',
    educationWhy: 'Alpha-arbutin (derived from uva ursi) inhibits melanin synthesis by blocking tyrosinase enzyme activity — the same pathway as synthetic hydroquinone but gentler, with lower irritation risk. Tannins provide astringency; antioxidant flavonoids protect against free-radical-induced pigmentation.',
    educationWhen: 'Excellent in brightening serums, targeted dark spot treatments, toners, and pigmentation-focused moisturizers. Works synergistically with vitamin C, niacinamide, and kojic acid. Use morning and evening — stable across pH ranges.',
    consumerAnalogy: 'Think of bearberry as nature\'s brightening secret — the sacred northern plant that First Nations peoples have used for thousands of years, now proven by science to contain the same brightening compound as expensive synthetic ingredients.',
    professionalAnalogy: 'Natural arbutin source standardized to 3–10% arbutin content. Tyrosinase inhibitor with gentler profile than synthetic hydroquinone. Use at 1–3% in brightening formulas, compatible with most pH ranges and other brightening actives.',
    transparencyStatement: 'Wild-crafted from Canadian boreal forests or certified organically grown. Standardized for arbutin content. Ethical harvesting from non-endangered populations. Deep cultural significance to Indigenous peoples — sourced with community partnership wherever possible.',
    historicalUseNotes: 'Known as "kinnikinnick" among many Plains Nations peoples (Cree, Blackfoot, Anishinaabe), bearberry was one of the most important medicinal plants in North American Indigenous medicine — used for urinary tract health, wound healing, and as a sacred smoking herb mixed with tobacco in ceremonial pipes. The name "kinnikinnick" means "what is mixed" in Algonquian languages. Across Siberia and Northern Europe it was similarly used in folk medicine for thousands of years. In skincare, its natural arbutin content makes it a modern functional brightener directly derived from ancient medicine traditions.',
    incompatibilities: ['Check with alpha-arbutin (additive effect — both inhibit tyrosinase)', 'Avoid in formulas with pH below 3.5 (hydrolysis of arbutin)'],
    canadianRelevance: 'One of the most abundant and iconic Canadian boreal plants. Grows in every province and territory. Deep significance in First Nations medicine. Available from Canadian wild-crafting cooperatives and certified organic suppliers. A pride ingredient for Canadian-made sacred skincare.'
  }
];

// ─── 5. Merge new ingredients (skip any already existing by slug) ─────────
const existingSlugs = new Set(data.ingredients.map(i => i.slug));
const added = [];

newIngredients.forEach(ni => {
  if (!existingSlugs.has(ni.slug)) {
    data.ingredients.push(ni);
    existingSlugs.add(ni.slug);
    added.push(ni.name);
  } else {
    // Update yhwhBeloved and sacredTraditions on existing entries
    const existing = data.ingredients.find(i => i.slug === ni.slug);
    if (existing) {
      existing.yhwhBeloved = ni.yhwhBeloved;
      if (ni.sacredTraditions) {
        if (!existing.sacredTraditions) existing.sacredTraditions = [];
        ni.sacredTraditions.forEach(t => {
          if (!existing.sacredTraditions.includes(t)) existing.sacredTraditions.push(t);
        });
      }
    }
  }
});

// ─── 6. Ensure ALL ingredients have yhwhBeloved field ─────────────────────
data.ingredients.forEach(i => {
  if (!('yhwhBeloved' in i)) i.yhwhBeloved = false;
});

// ─── 7. Write output ───────────────────────────────────────────────────────
data.lastUpdated = new Date().toISOString().split('T')[0];
data.version = (parseFloat(data.version || '1.0') + 0.1).toFixed(1);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// ─── 8. Stats ─────────────────────────────────────────────────────────────
console.log('✅ Update complete');
console.log('New ingredients added:', added);
console.log('Total ingredients:', data.ingredients.length);
console.log('yhwhBeloved:', data.ingredients.filter(i => i.yhwhBeloved).length);
console.log('sacredBiblical:', data.ingredients.filter(i => i.sacredBiblical).length);
console.log('sacredAncient:', data.ingredients.filter(i => i.sacredAncient).length);
console.log('Native American sacred:', data.ingredients.filter(i => i.sacredTraditions && i.sacredTraditions.includes('Native American sacred')).length);
console.log('YHWH beloved list:', data.ingredients.filter(i => i.yhwhBeloved).map(i => i.name));
