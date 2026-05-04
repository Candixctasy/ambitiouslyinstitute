import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { getAListProfile } from 'backend/alist.web';
import { getActiveDiscount } from 'backend/alist.web';

$w.onReady(async function () {
    await initNav();
    await initMemberState();
});

async function initNav() {
    const path = wixLocation.path;

    if ($w('#hamburgerBtn').length > 0) {
        $w('#hamburgerBtn').onClick(() => {
            const menu = $w('#mobileMenu');
            if (menu.hidden) { menu.show('fade'); } else { menu.hide('fade'); }
        });
    }

    if ($w('#closeMenuBtn').length > 0) {
        $w('#closeMenuBtn').onClick(() => $w('#mobileMenu').hide('fade'));
    }

    if ($w('#cartIcon').length > 0) {
        $w('#cartIcon').onClick(() => wixLocation.to('/cart'));
    }
}

async function initMemberState() {
    try {
        const member = await currentMember.getMember();
        if (member) {
            if ($w('#loginBtn').length > 0) $w('#loginBtn').hide();
            if ($w('#memberMenu').length > 0) $w('#memberMenu').show();
            if ($w('#memberName').length > 0) $w('#memberName').text = member.profile?.nickname || member.loginEmail?.split('@')[0] || 'Member';
            await loadAListBadge(member.loginEmail);
        } else {
            if ($w('#memberMenu').length > 0) $w('#memberMenu').hide();
            if ($w('#loginBtn').length > 0) $w('#loginBtn').show();
        }
    } catch (_) {
        if ($w('#memberMenu').length > 0) $w('#memberMenu').hide();
        if ($w('#loginBtn').length > 0) $w('#loginBtn').show();
    }
}

async function loadAListBadge(email) {
    if (!email || !$w('#alistBadge').length) return;
    try {
        const { member } = await getAListProfile(email);
        if (member && member.status === 'active') {
            $w('#alistBadge').show();
            const { discount, isBirthday } = await getActiveDiscount(email, member.tier || 'consumer');
            if (isBirthday && $w('#birthdayBanner').length > 0) {
                $w('#birthdayBanner').text = `Happy Birthday! Your ${discount}% discount is active today.`;
                $w('#birthdayBanner').show();
            }
        }
    } catch (_) {}
}
