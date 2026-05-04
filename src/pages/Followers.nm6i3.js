import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/followers'); return; }
        if ($w('#followersWidget').length > 0) $w('#followersWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/followers'); }
});
