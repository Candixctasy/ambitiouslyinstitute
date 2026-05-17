// Ambitiously Institute — Home page

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    initCtaButtons();
    await initMemberGreeting();
});

async function initMemberGreeting() {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) return;

    const name = member.contactDetails?.firstName || member.loginEmail?.split('@')[0] || '';
    if (name) {
        try { $w('#heroGreeting').text = `Welcome back, ${name}.`; } catch (_) {}
    }
}

function initCtaButtons() {
    try {
        $w('#applyNowBtn').onClick(() => wixLocation.to('/apply'));
    } catch (_) {}

    try {
        $w('#viewProgramsBtn').onClick(() => wixLocation.to('/plans-pricing'));
    } catch (_) {}

    try {
        $w('#viewEventsBtn').onClick(() => wixLocation.to('/events'));
    } catch (_) {}
}
