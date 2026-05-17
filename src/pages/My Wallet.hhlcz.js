import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-wallet'); return; }
        if ($w('#walletWidget').length > 0) $w('#walletWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/my-wallet'); }
});
