// Ambitiously Institute — Service Page (individual service detail)

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    const isLoggedIn = !!member;

    initBookingButton(isLoggedIn);
    initRelatedServices();
});

function initBookingButton(isLoggedIn) {
    try {
        $w('#bookNowBtn').onClick(() => {
            if (!isLoggedIn) {
                wixLocation.to('/login?redirect=' + encodeURIComponent(wixLocation.url));
                return;
            }
            // Wix Bookings handles the booking flow via its native widget.
            $w('#bookingWidget').scrollTo();
        });
    } catch (_) {}
}

function initRelatedServices() {
    try {
        $w('#viewAllServicesBtn').onClick(() => wixLocation.to('/schedule'));
    } catch (_) {}

    try {
        $w('#viewPricingBtn').onClick(() => wixLocation.to('/plans-pricing'));
    } catch (_) {}
}
