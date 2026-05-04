import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-subscriptions'); return; }
        if ($w('#subscriptionsWidget').length > 0) $w('#subscriptionsWidget').show();
        if ($w('#viewPlansBtn').length > 0) $w('#viewPlansBtn').onClick(() => wixLocation.to('/plans-pricing'));
    } catch (_) { wixLocation.to('/login?redirect=/my-subscriptions'); }
});
