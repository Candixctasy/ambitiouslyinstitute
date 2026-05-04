// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

const PLANS = [
    {
        id: 'revenue-intensive',
        name: 'Revenue Intensive',
        price: '$750',
        duration: '2-Hour Strategy Session',
        tag: null,
        features: [
            'Revenue architecture overview',
            'Consultation language frameworks',
            'Pricing strategy audit',
        ],
        ctaLabel: 'Apply Now',
        applyPath: '/apply?plan=revenue-intensive',
    },
    {
        id: 'revenue-architecture',
        name: 'Revenue Architecture Program',
        price: '$1,750',
        duration: '4-Week Program',
        tag: 'MOST POPULAR',
        features: [
            'Full operational curriculum',
            'Educator language scripts',
            'Wix-ready website components',
            'Weekly strategy sessions',
        ],
        ctaLabel: 'Apply Now',
        applyPath: '/apply?plan=revenue-architecture',
    },
    {
        id: 'executive-territory',
        name: 'Executive Territory Strategy',
        price: '$5,000+',
        duration: 'Custom Engagement',
        tag: null,
        features: [
            'Full territory revenue system',
            'Franchise / clinic deployment',
            'Direct founder engagement',
            '90-day performance framework',
        ],
        ctaLabel: 'Request Consultation',
        applyPath: '/apply?plan=executive-territory',
    },
];

const FAQS = [
    {
        q: 'Will this work for my specific modality?',
        a: 'If you consult with clients and recommend home care, yes. The language adapts to any treatment.',
    },
    {
        q: "What's the difference between this and other courses?",
        a: "Most programs teach you how to post on Instagram. This teaches you how to speak so clients say yes. It's operational infrastructure, not marketing tips.",
    },
    {
        q: 'Is there a payment plan?',
        a: "Not for the founding cohort. The $297 is already 40% off future pricing.",
    },
    {
        q: "What if I can't make live sessions?",
        a: 'Recordings available, but live attendance recommended for direct feedback on your scripts.',
    },
    {
        q: 'How is this different from your beauty services?',
        a: "AmBitiously By BoBo is my practice. Ambitiously Institute is my teaching. Both serve beauty professionals — one through direct service, one through education.",
    },
];

$w.onReady(async function () {
    await initPricingCards();
    initFaqAccordion();
    initFoundingCohortCta();
});

async function initPricingCards() {
    const member = await currentMember.getMember().catch(() => null);
    const isLoggedIn = !!member;

    $w('#pricingRepeater').data = PLANS;

    $w('#pricingRepeater').onItemReady(($item, itemData) => {
        $item('#planName').text = itemData.name;
        $item('#planPrice').text = itemData.price;
        $item('#planDuration').text = itemData.duration;

        if (itemData.tag) {
            $item('#planTag').text = itemData.tag;
            $item('#planTag').show();
        } else {
            $item('#planTag').hide();
        }

        $item('#planFeaturesList').text = itemData.features
            .map(f => `✓ ${f}`)
            .join('\n');

        $item('#planCta').label = itemData.ctaLabel;
        $item('#planCta').onClick(() => handlePlanCta(itemData, isLoggedIn));
    });
}

function handlePlanCta(plan, isLoggedIn) {
    if (!isLoggedIn) {
        wixLocation.to(`/login?redirect=${encodeURIComponent(plan.applyPath)}`);
        return;
    }
    wixLocation.to(plan.applyPath);
}

function initFaqAccordion() {
    $w('#faqRepeater').data = FAQS.map((item, index) => ({
        ...item,
        _id: String(index),
        isOpen: false,
    }));

    $w('#faqRepeater').onItemReady(($item, itemData) => {
        $item('#faqQuestion').text = itemData.q;
        $item('#faqAnswer').text = itemData.a;
        $item('#faqAnswer').collapse();

        $item('#faqQuestion').onClick(() => {
            const isOpen = $item('#faqAnswer').collapsed;
            if (isOpen) {
                $item('#faqAnswer').expand();
                $item('#faqToggleIcon').text = '−';
            } else {
                $item('#faqAnswer').collapse();
                $item('#faqToggleIcon').text = '+';
            }
        });
    });
}

function initFoundingCohortCta() {
    $w('#foundingCohortBtn').onClick(async () => {
        const member = await currentMember.getMember().catch(() => null);
        const destination = '/apply?plan=founding-cohort';
        if (!member) {
            wixLocation.to(`/login?redirect=${encodeURIComponent(destination)}`);
            return;
        }
        wixLocation.to(destination);
    });

    $w('#downloadScriptBtn').onClick(() => {
        wixLocation.to('/free-consultation-script');
    });
}
