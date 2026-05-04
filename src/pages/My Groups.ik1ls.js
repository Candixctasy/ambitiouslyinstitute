import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-groups'); return; }
        if ($w('#myGroupsWidget').length > 0) $w('#myGroupsWidget').show();
        if ($w('#browseGroupsBtn').length > 0) $w('#browseGroupsBtn').onClick(() => wixLocation.to('/groups'));
    } catch (_) { wixLocation.to('/login?redirect=/my-groups'); }
});
