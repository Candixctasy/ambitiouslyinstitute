// Ambitiously Institute — Event Info (single event detail) page

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    const isLoggedIn = !!member;

    initRsvpButton(isLoggedIn);
    initShareButton();
});

function initRsvpButton(isLoggedIn) {
    try {
        $w('#rsvpBtn').onClick(() => {
            if (!isLoggedIn) {
                wixLocation.to('/login?redirect=' + encodeURIComponent(wixLocation.url));
                return;
            }
            // Wix Events handles RSVP natively via its built-in widget.
            // This click handler covers custom CTA buttons outside the widget.
            $w('#eventRsvpWidget').scrollTo();
        });
    } catch (_) {}
}

function initShareButton() {
    try {
        $w('#shareBtn').onClick(() => {
            if (navigator.share) {
                navigator.share({ url: wixLocation.url });
            } else {
                navigator.clipboard.writeText(wixLocation.url);
                $w('#shareFeedback').show();
                setTimeout(() => $w('#shareFeedback').hide(), 2000);
            }
        });
    } catch (_) {}
}
