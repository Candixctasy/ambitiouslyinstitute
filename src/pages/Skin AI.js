// Skin AI — C-Ai Diagnostic Funnel
// Three-tier pricing landing page that drives product sales and course upsells.
//
// Wix elements expected:
//   #heroHeading          — Text: page headline
//   #heroSubheading       — Text: supporting copy
//   #tiersRepeater        — Repeater: one card per consultation tier
//     #tierName           — Text
//     #tierPrice          — Text
//     #tierHeadline       — Text
//     #tierDescription    — Text
//     #tierBadge          — Box (hidden unless popular === true)
//     #tierBadgeText      — Text ("Most Popular")
//     #tierCTA            — Button: navigates to checkout
//   #skinQuizSection      — Box: quiz entry point (collapsed by default)
//   #skinTypeInput        — Dropdown
//   #concernsInput        — Text input
//   #goalsInput           — Text input
//   #budgetInput          — Dropdown
//   #runQuizBtn           — Button
//   #quizLoadingSpinner   — Image/Animation (hidden by default)
//   #dualRecommendSection — Box (hidden until quiz complete)
//   #productRec           — Text: recommended product name
//   #productRecBtn        — Button: shop the product
//   #courseRec            — Text: recommended course name
//   #courseRecBtn         — Button: view course

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getSkinAITiers, getSkinAIDualRecommendation } from 'backend/ecosystem.web';
import { getActiveDiscount } from 'backend/alist.web';

$w.onReady(async function () {
    await renderTiers();
    initQuiz();
    await maybePreFillMember();
});

async function renderTiers() {
    try {
        const { tiers } = await getSkinAITiers();
        if (!$w('#tiersRepeater').length || !tiers?.length) return;

        $w('#tiersRepeater').data = tiers;

        $w('#tiersRepeater').onItemReady(($item, tier) => {
            if ($item('#tierName').length) $item('#tierName').text = tier.name;
            if ($item('#tierPrice').length) $item('#tierPrice').text = `$${tier.priceCad} CAD`;
            if ($item('#tierHeadline').length) $item('#tierHeadline').text = tier.headline;
            if ($item('#tierDescription').length) $item('#tierDescription').text = tier.description;

            // Silver (middle) tier is highlighted by default — the "most popular" anchor
            if ($item('#tierBadge').length) {
                if (tier.popular) { $item('#tierBadge').show(); }
                else { $item('#tierBadge').hide(); }
            }
            if ($item('#tierBadgeText').length) $item('#tierBadgeText').text = 'Most Popular';

            // Silver card gets a visual "selected" state to draw the eye immediately
            if (tier.popular && $item('#tierCard').length) {
                $item('#tierCard').customClassList.add('tier-selected');
            }

            if ($item('#tierCTA').length) {
                $item('#tierCTA').label = tier.cta;
                $item('#tierCTA').onClick(() => wixLocation.to(tier.checkoutUrl));
            }
        });
    } catch (_) {}
}

async function maybePreFillMember() {
    try {
        const member = await currentMember.getMember();
        if (!member) return;
        const { discount } = await getActiveDiscount(member.loginEmail, 'consumer').catch(() => ({}));
        if (discount && $w('#memberDiscountNote').length) {
            $w('#memberDiscountNote').text = `Your A List ${discount}% discount will be applied at checkout.`;
            $w('#memberDiscountNote').show();
        }
    } catch (_) {}
}

function initQuiz() {
    if ($w('#runQuizBtn').length) {
        $w('#runQuizBtn').onClick(() => runSkinQuiz());
    }
    if ($w('#dualRecommendSection').length) $w('#dualRecommendSection').hide();
    if ($w('#quizLoadingSpinner').length) $w('#quizLoadingSpinner').hide();
}

async function runSkinQuiz() {
    const skinType = $w('#skinTypeInput').length ? $w('#skinTypeInput').value : '';
    const concerns = $w('#concernsInput').length ? $w('#concernsInput').value?.trim() : '';
    const goals = $w('#goalsInput').length ? $w('#goalsInput').value?.trim() : '';
    const budget = $w('#budgetInput').length ? $w('#budgetInput').value : '';

    if (!skinType || !concerns || !goals) {
        if ($w('#quizError').length) {
            $w('#quizError').text = 'Please fill in all fields before running your analysis.';
            $w('#quizError').show();
        }
        return;
    }

    if ($w('#quizError').length) $w('#quizError').hide();
    if ($w('#quizLoadingSpinner').length) $w('#quizLoadingSpinner').show();
    if ($w('#runQuizBtn').length) $w('#runQuizBtn').disable();

    try {
        const result = await getSkinAIDualRecommendation({ skinType, concerns, goals, budget });

        if ($w('#dualRecommendSection').length) {
            $w('#dualRecommendSection').show('fade');
        }

        // Product recommendation
        if (result.productRecommendation) {
            if ($w('#productRec').length) {
                $w('#productRec').text = result.productRecommendation.name || 'Recommended for your skin';
            }
            if ($w('#productRecDesc').length && result.productRecommendation.reason) {
                $w('#productRecDesc').text = result.productRecommendation.reason;
            }
            if ($w('#productRecBtn').length) {
                const productUrl = result.productRecommendation.productUrl || '/shop';
                $w('#productRecBtn').label = `Shop ${result.productRecommendation.name || 'This Product'}`;
                $w('#productRecBtn').onClick(() => wixLocation.to(productUrl));
            }
        }

        // Course recommendation
        if (result.courseRecommendation) {
            if ($w('#courseRec').length) {
                $w('#courseRec').text = result.courseRecommendation.name || 'Recommended certification course';
            }
            if ($w('#courseRecDesc').length && result.courseRecommendation.reason) {
                $w('#courseRecDesc').text = result.courseRecommendation.reason;
            }
            if ($w('#courseRecBtn').length) {
                const courseUrl = result.courseRecommendation.courseUrl ||
                    'https://ambitiouslyinstitute.ambitiouslybybobo.com/apply';
                $w('#courseRecBtn').label = 'View Certification Course';
                $w('#courseRecBtn').onClick(() => wixLocation.to(courseUrl));
            }
        }

        // Scroll to recommendation section
        if ($w('#dualRecommendSection').length) {
            $w('#dualRecommendSection').scrollTo();
        }
    } catch (_) {
        if ($w('#quizError').length) {
            $w('#quizError').text = 'Analysis unavailable — please try again in a moment.';
            $w('#quizError').show();
        }
    } finally {
        if ($w('#quizLoadingSpinner').length) $w('#quizLoadingSpinner').hide();
        if ($w('#runQuizBtn').length) $w('#runQuizBtn').enable();
    }
}
