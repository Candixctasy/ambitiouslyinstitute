import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/shared-gallery'); return; }
        if ($w('#sharedGallery').length > 0) $w('#sharedGallery').show();
    } catch (_) { wixLocation.to('/login?redirect=/shared-gallery'); }
});
