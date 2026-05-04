import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';

const PROGRAMS = [
    { id: 'ebos', name: 'EBOS', price: 297, url: '/apply?program=ebos' },
    { id: 'revenue-architecture', name: 'Revenue Architecture', price: 1750, url: '/apply?program=revenue-architecture' },
    { id: 'territory-strategy', name: 'Territory Strategy', price: 5000, url: '/apply?program=territory-strategy' },
];

$w.onReady(async function () {
    initPlanButtons();
    await applyMemberDiscount();
});

function initPlanButtons() {
    PROGRAMS.forEach(({ id, url }) => {
        const btn = `#enroll_${id}`.replace(/-/g, '_');
        if ($w(btn).length > 0) $w(btn).onClick(() => wixLocation.to(url));
    });

    if ($w('#ebosCTA').length > 0) $w('#ebosCTA').onClick(() => wixLocation.to('/apply?program=ebos'));
    if ($w('#revArchCTA').length > 0) $w('#revArchCTA').onClick(() => wixLocation.to('/apply?program=revenue-architecture'));
    if ($w('#territoryCTA').length > 0) $w('#territoryCTA').onClick(() => wixLocation.to('/apply?program=territory-strategy'));
}

async function applyMemberDiscount() {
    try {
        const member = await currentMember.getMember();
        if (!member) return;

        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (!discount) return;

        PROGRAMS.forEach(({ id, price }) => {
            const el = `#price_${id}`.replace(/-/g, '_');
            if ($w(el).length > 0) {
                const discounted = (price * (1 - discount / 100)).toFixed(2);
                $w(el).text = `$${discounted} (${discount}% A List${isBirthday ? ' Birthday' : ''} discount applied)`;
            }
        });

        if ($w('#discountBanner').length > 0) {
            $w('#discountBanner').text = `Your A List ${discount}% discount is active${isBirthday ? ' — Birthday bonus included!' : '.'}`;
            $w('#discountBanner').show();
        }
    } catch (_) {}
}
