import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/book-online'); return; }
    } catch (_) { wixLocation.to('/login?redirect=/book-online'); return; }

    if ($w('#bookingWidget').length > 0) $w('#bookingWidget').show();
    if ($w('#continueBtn').length > 0) $w('#continueBtn').onClick(() => wixLocation.to('/booking-calendar'));
});
