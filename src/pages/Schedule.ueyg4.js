import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/schedule'); return; }
        if ($w('#scheduleWidget').length > 0) $w('#scheduleWidget').show();
        if ($w('#bookBtn').length > 0) $w('#bookBtn').onClick(() => wixLocation.to('/book-online'));
    } catch (_) { wixLocation.to('/login?redirect=/schedule'); }
});
