import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/settings'); return; }
        if ($w('#settingsWidget').length > 0) $w('#settingsWidget').show();
        if ($w('#emailVal').length > 0) $w('#emailVal').text = member.loginEmail || '';
        if ($w('#nameVal').length > 0) $w('#nameVal').text = member.profile?.nickname || '';
    } catch (_) { wixLocation.to('/login?redirect=/settings'); }
});
