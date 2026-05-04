import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    if ($w('#viewPlansBtn').length > 0) $w('#viewPlansBtn').onClick(() => wixLocation.to('/plans-pricing'));
    if ($w('#loginBtn').length > 0) {
        $w('#loginBtn').onClick(async () => {
            try {
                const member = await currentMember.getMember();
                if (member) wixLocation.to('/my-account');
                else wixLocation.to('/login?redirect=' + wixLocation.url);
            } catch (_) { wixLocation.to('/login?redirect=' + wixLocation.url); }
        });
    }
});
