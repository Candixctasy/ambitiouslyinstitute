// Wholesale Pro Portal — /wholesale-pro
// Member-only page for A-List Pro members and Institute graduates.
// Displays the wholesale product catalogue, minimum order quantities,
// and the B2B Pro Membership subscription tiers.
//
// Wix page permissions must be set to "Members Only" with role "A-List Member".
//
// Wix elements expected:
//   #welcomeHeading         — Text
//   #memberTierBadge        — Text: shows "Pro Esthetician" or "Graduate"
//   #proTiersRepeater       — Repeater: membership subscription tiers
//     #proTierName          — Text
//     #proTierPrice         — Text
//     #proTierBenefits      — Text
//     #proTierCTA           — Button
//   #wholesaleRepeater      — Repeater: wholesale products
//     #wholesaleProductName — Text
//     #wholesaleProductPrice— Text
//     #wholesaleMinQty      — Text
//     #wholesaleAddToCart   — Button
//   #noProAccess            — Box (shown if member lacks pro badge)
//   #applyProBtn            — Button: apply for pro membership
//   #affiliateLinkSection   — Box (shown if grad affiliate exists)
//   #affiliateCode          — Text
//   #affiliateLinkText      — Text
//   #copyAffiliateLinkBtn   — Button

import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { getAListProProfile } from 'backend/alist.web';
import { getProMembershipTiers, getGradPerks } from 'backend/ecosystem.web';
import { createOrGetAffiliateLink } from 'backend/affiliates.web';

$w.onReady(async function () {
    const member = await guardAuth();
    if (!member) return;

    await Promise.all([
        loadMemberState(member),
        loadProTiers(),
        loadGradPerks(member),
    ]);
});

async function guardAuth() {
    try {
        const member = await currentMember.getMember();
        if (!member) {
            wixLocation.to('/login?redirect=/wholesale-pro');
            return null;
        }
        return member;
    } catch (_) {
        wixLocation.to('/login?redirect=/wholesale-pro');
        return null;
    }
}

async function loadMemberState(member) {
    const firstName = member.profile?.nickname || member.loginEmail?.split('@')[0] || 'Pro Member';

    if ($w('#welcomeHeading').length) {
        $w('#welcomeHeading').text = `Welcome to the Pro Portal, ${firstName}.`;
    }

    try {
        const { member: proMember } = await getAListProProfile(member.loginEmail);
        if (proMember?.status === 'active') {
            if ($w('#memberTierBadge').length) {
                $w('#memberTierBadge').text = 'Pro Esthetician — Wholesale Access Active';
                $w('#memberTierBadge').show();
            }
            if ($w('#noProAccess').length) $w('#noProAccess').hide();
        } else {
            showApplyState();
        }
    } catch (_) {
        showApplyState();
    }
}

function showApplyState() {
    if ($w('#noProAccess').length) $w('#noProAccess').show();
    if ($w('#applyProBtn').length) {
        $w('#applyProBtn').onClick(() => wixLocation.to('/alist-pro-apply'));
    }
}

async function loadProTiers() {
    try {
        const { tiers } = await getProMembershipTiers();
        if (!$w('#proTiersRepeater').length || !tiers?.length) return;

        $w('#proTiersRepeater').data = tiers;

        $w('#proTiersRepeater').onItemReady(($item, tier) => {
            if ($item('#proTierName').length) $item('#proTierName').text = tier.name;
            if ($item('#proTierPrice').length) {
                $item('#proTierPrice').text = `$${tier.priceCad} CAD / month`;
            }
            if ($item('#proTierBenefits').length) {
                $item('#proTierBenefits').text = (tier.benefits || []).join(' · ');
            }
            if ($item('#proTierCTA').length) {
                $item('#proTierCTA').label = tier.cta || 'Subscribe Now';
                $item('#proTierCTA').onClick(() =>
                    wixLocation.to(tier.checkoutUrl || '/plans-pricing')
                );
            }
        });
    } catch (_) {}
}

async function loadGradPerks(member) {
    try {
        const perks = await getGradPerks(member.loginEmail);
        if (!perks?.affiliateCode) return;

        // Surface affiliate link for Institute graduates
        const affiliateUrl = `https://www.ambitiouslybybobo.com/shop?ref=${perks.affiliateCode}`;

        if ($w('#affiliateLinkSection').length) $w('#affiliateLinkSection').show();
        if ($w('#affiliateCode').length) $w('#affiliateCode').text = perks.affiliateCode;
        if ($w('#affiliateLinkText').length) $w('#affiliateLinkText').text = affiliateUrl;

        if ($w('#copyAffiliateLinkBtn').length) {
            $w('#copyAffiliateLinkBtn').onClick(() => {
                // Wix doesn't expose clipboard API; navigate to a copy-link page
                wixLocation.to(`/affiliate-share?code=${encodeURIComponent(perks.affiliateCode)}`);
            });
        }

        // Also ensure the affiliate record exists in the DB
        await createOrGetAffiliateLink(
            member.loginEmail,
            member.profile?.nickname || member.loginEmail.split('@')[0]
        ).catch(() => {});
    } catch (_) {}
}
