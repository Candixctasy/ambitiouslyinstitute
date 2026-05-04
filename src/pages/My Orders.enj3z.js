import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-orders'); return; }
        if ($w('#ordersWidget').length > 0) $w('#ordersWidget').show();
        if ($w('#shopBtn').length > 0) $w('#shopBtn').onClick(() => wixLocation.to('/shop'));
    } catch (_) { wixLocation.to('/login?redirect=/my-orders'); }
});
