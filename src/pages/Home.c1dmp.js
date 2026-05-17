import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { askCAI } from 'backend/cai.web';

$w.onReady(async function () {
    initHero();
    initProgramCards();
    initTestimonialScroller();
    initApplyForm();
    await initCAIChat();
});

function initHero() {
    if ($w('#applyHeroBtn').length > 0) {
        $w('#applyHeroBtn').onClick(() => wixLocation.to('/apply'));
    }
    if ($w('#learnMoreBtn').length > 0) {
        $w('#learnMoreBtn').onClick(() => wixLocation.to('/programs'));
    }
}

function initProgramCards() {
    const programs = [
        { id: '#ebosCTA', url: '/apply?program=ebos' },
        { id: '#revenueArchCTA', url: '/apply?program=revenue-architecture' },
        { id: '#territoryCTA', url: '/apply?program=territory-strategy' },
    ];
    programs.forEach(({ id, url }) => {
        if ($w(id).length > 0) $w(id).onClick(() => wixLocation.to(url));
    });
}

function initTestimonialScroller() {
    if ($w('#testimonialsGallery').length > 0) {
        let idx = 0;
        const items = $w('#testimonialsGallery').items || [];
        if (items.length > 1) {
            setInterval(() => {
                idx = (idx + 1) % items.length;
                $w('#testimonialsGallery').changeItem(idx);
            }, 5000);
        }
    }
}

function initApplyForm() {
    if ($w('#quickApplyBtn').length > 0) {
        $w('#quickApplyBtn').onClick(() => wixLocation.to('/apply'));
    }
}

async function initCAIChat() {
    if (!$w('#caiInput').length || !$w('#caiSend').length) return;

    $w('#caiSend').onClick(() => sendCAIMessage());
    $w('#caiInput').onKeyPress((e) => {
        if (e.key === 'Enter') sendCAIMessage();
    });

    try {
        const greeting = await askCAI(
            "Give a one-sentence warm welcome to a beauty professional visiting the Ambitiously Institute homepage.",
            "homepage"
        );
        if ($w('#caiGreeting').length > 0) {
            $w('#caiGreeting').text = greeting.answer || greeting.response || "Welcome — I'm C-Ai, your executive education advisor.";
        }
    } catch (_) {
        if ($w('#caiGreeting').length > 0) {
            $w('#caiGreeting').text = "Welcome — I'm C-Ai, your executive education advisor.";
        }
    }
}

async function sendCAIMessage() {
    const input = $w('#caiInput');
    const output = $w('#caiOutput');
    const question = input.value?.trim();
    if (!question) return;

    input.value = '';
    if (output.length > 0) output.text = 'Thinking…';

    try {
        const res = await askCAI(question, 'institute-homepage');
        if (output.length > 0) output.text = res.answer || res.response || "I'm here to help guide your path at the Institute.";
    } catch (_) {
        if (output.length > 0) output.text = "Connection error — please try again in a moment.";
    }
}
