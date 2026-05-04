import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/groups'); return; }
        if ($w('#groupWidget').length > 0) $w('#groupWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/groups'); }
});
