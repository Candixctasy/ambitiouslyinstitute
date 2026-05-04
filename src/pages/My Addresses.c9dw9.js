import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-addresses'); return; }
        if ($w('#addressesWidget').length > 0) $w('#addressesWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/my-addresses'); }
});
