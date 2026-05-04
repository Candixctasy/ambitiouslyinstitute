import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';
import { upsertContact } from 'backend/database.web';

$w.onReady(async function () {
    const member = await guardAuth();
    if (!member) return;
    await applyAListDiscount(member.loginEmail);
    initCheckoutForm(member);
});

async function guardAuth() {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/checkout'); return null; }
        return member;
    } catch (_) { wixLocation.to('/login?redirect=/checkout'); return null; }
}

async function applyAListDiscount(email) {
    try {
        const { discount, isBirthday, tier } = await getActiveDiscount(email, 'consumer');
        if (!discount || !$w('#discountLine').length) return;
        $w('#discountLine').text = `A List${isBirthday ? ' Birthday' : ''} Discount (${discount}%): -${discount}%`;
        $w('#discountLine').show();
    } catch (_) {}
}

function initCheckoutForm(member) {
    if ($w('#emailInput').length > 0 && member.loginEmail) {
        $w('#emailInput').value = member.loginEmail;
    }
    if ($w('#nameInput').length > 0 && member.profile?.nickname) {
        $w('#nameInput').value = member.profile.nickname;
    }

    if ($w('#placeOrderBtn').length > 0) {
        $w('#placeOrderBtn').onClick(async () => {
            const email = $w('#emailInput')?.value?.trim();
            if (!email) { showError('Email required'); return; }
            try {
                await upsertContact({ email, source: 'checkout', updatedAt: new Date().toISOString() });
            } catch (_) {}
        });
    }
}

function showError(msg) {
    if ($w('#checkoutError').length > 0) {
        $w('#checkoutError').text = msg;
        $w('#checkoutError').show();
    }
}
