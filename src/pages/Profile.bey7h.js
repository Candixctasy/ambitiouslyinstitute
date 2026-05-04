import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { getAListProfile, getSkinHistory } from 'backend/alist.web';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/profile'); return; }

        if ($w('#profileName').length > 0) $w('#profileName').text = member.profile?.nickname || member.loginEmail?.split('@')[0] || 'Member';
        if ($w('#profileEmail').length > 0) $w('#profileEmail').text = member.loginEmail || '';

        const { member: alistMember } = await getAListProfile(member.loginEmail).catch(() => ({ member: null }));
        if (alistMember && $w('#alistStatus').length > 0) {
            $w('#alistStatus').text = `A List Member — ${alistMember.tier === 'professional' ? 'Professional' : 'Consumer'} Tier`;
            $w('#alistStatus').show();
        }

        const { history } = await getSkinHistory(member.loginEmail).catch(() => ({ history: [] }));
        if (history?.length > 0 && $w('#lastCheckIn').length > 0) {
            const last = new Date(history[0].trackedAt);
            $w('#lastCheckIn').text = `Last skin check-in: ${last.toLocaleDateString('en-CA')}`;
            $w('#lastCheckIn').show();
        }
    } catch (_) {}

    if ($w('#editProfileBtn').length > 0) $w('#editProfileBtn').onClick(() => wixLocation.to('/settings'));
    if ($w('#myAccountBtn').length > 0) $w('#myAccountBtn').onClick(() => wixLocation.to('/my-account'));
});
