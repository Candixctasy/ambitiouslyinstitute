import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';

$w.onReady(async function () {
    if ($w('#checkoutBtn').length > 0) $w('#checkoutBtn').onClick(() => wixLocation.to('/checkout'));
    if ($w('#viewCartBtn').length > 0) $w('#viewCartBtn').onClick(() => wixLocation.to('/cart'));

    try {
        const member = await currentMember.getMember();
        if (!member) return;
        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (discount && $w('#sideCartDiscount').length > 0) {
            $w('#sideCartDiscount').text = `A List ${discount}% off${isBirthday ? ' 🎂' : ''}`;
            $w('#sideCartDiscount').show();
        }
    } catch (_) {}
});
