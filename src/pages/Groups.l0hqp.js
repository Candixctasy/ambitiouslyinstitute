import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    if ($w('#joinGroupBtn').length > 0) {
        $w('#joinGroupBtn').onClick(async () => {
            try {
                const member = await currentMember.getMember();
                if (!member) { wixLocation.to('/login?redirect=/groups'); return; }
            } catch (_) { wixLocation.to('/login?redirect=/groups'); }
        });
    }
});
