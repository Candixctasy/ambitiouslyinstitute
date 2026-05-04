import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/booking-calendar'); return; }
    } catch (_) { wixLocation.to('/login?redirect=/booking-calendar'); return; }

    if ($w('#bookingCalendar').length > 0) $w('#bookingCalendar').show();
    if ($w('#confirmBookingBtn').length > 0) {
        $w('#confirmBookingBtn').onClick(() => wixLocation.to('/my-bookings'));
    }
});
