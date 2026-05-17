// Ambitiously Institute — My Bookings page

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) {
        wixLocation.to('/login?redirect=/my-bookings');
        return;
    }
    initBookNowButton();
});

function initBookNowButton() {
    // Wix Bookings renders the booking list automatically via the My Bookings widget.
    // This handles any standalone CTA buttons on the page.
    try {
        $w('#bookNewSessionBtn').onClick(() => wixLocation.to('/schedule'));
    } catch (_) {}

    try {
        $w('#browseProgramsBtn').onClick(() => wixLocation.to('/plans-pricing'));
    } catch (_) {}
}
