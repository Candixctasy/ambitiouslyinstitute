import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';

$w.onReady(async function () {
    initBooking();
    await applyAListPricing();
});

function initBooking() {
    if ($w('#bookServiceBtn').length > 0) {
        $w('#bookServiceBtn').onClick(() => wixLocation.to('/booking'));
    }
    if ($w('#addToCartBtn').length > 0) {
        $w('#addToCartBtn').onClick(() => wixLocation.to('/cart'));
    }
}

async function applyAListPricing() {
    try {
        const member = await currentMember.getMember();
        if (!member) return;
        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (!discount || !$w('#alistServicePrice').length) return;
        $w('#alistServicePrice').text = `A List Members: ${discount}% off${isBirthday ? ' (Birthday bonus!)' : ''}`;
        $w('#alistServicePrice').show();
    } catch (_) {}
}
