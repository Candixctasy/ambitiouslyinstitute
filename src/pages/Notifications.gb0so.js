import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/notifications'); return; }
        if ($w('#notificationsWidget').length > 0) $w('#notificationsWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/notifications'); }
});
