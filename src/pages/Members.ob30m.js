import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/members'); return; }
        if ($w('#membersWidget').length > 0) $w('#membersWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/members'); }
});
