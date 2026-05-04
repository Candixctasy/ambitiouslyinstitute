import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';

$w.onReady(async function () {
    initCartActions();
    await applyAListDiscount();
});

function initCartActions() {
    if ($w('#checkoutBtn').length > 0) {
        $w('#checkoutBtn').onClick(() => wixLocation.to('/checkout'));
    }
    if ($w('#continueShoppingBtn').length > 0) {
        $w('#continueShoppingBtn').onClick(() => wixLocation.to('/shop'));
    }
}

async function applyAListDiscount() {
    try {
        const member = await currentMember.getMember();
        if (!member) return;
        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (!discount) return;
        if ($w('#alistDiscountBadge').length > 0) {
            $w('#alistDiscountBadge').text = `${discount}% A List${isBirthday ? ' Birthday' : ''} Discount Active`;
            $w('#alistDiscountBadge').show();
        }
    } catch (_) {}
}
