import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/files'); return; }
        if ($w('#filesWidget').length > 0) $w('#filesWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/files'); }
});
