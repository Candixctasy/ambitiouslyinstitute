import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/file-share'); return; }
        if ($w('#fileShareWidget').length > 0) $w('#fileShareWidget').show();
    } catch (_) { wixLocation.to('/login?redirect=/file-share'); }
});
