import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/notifications'); return; }
        if ($w('#notificationSettingsWidget').length > 0) $w('#notificationSettingsWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/notifications'); }
});
