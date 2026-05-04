import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-bookings'); return; }
        if ($w('#bookingsWidget').length > 0) $w('#bookingsWidget').show();
        if ($w('#bookAnotherBtn').length > 0) $w('#bookAnotherBtn').onClick(() => wixLocation.to('/book-online'));
    } catch (_) { wixLocation.to('/login?redirect=/my-bookings'); }
});
