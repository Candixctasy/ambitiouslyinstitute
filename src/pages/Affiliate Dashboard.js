// Affiliate Dashboard — /affiliate-dashboard
// Shows Institute graduate affiliates their referral link, click counts,
// conversions, total earnings, and pending payout.
//
// Wix elements expected:
//   #affiliateCode        — Text
//   #affiliateLinkDisplay — Text: full referral URL
//   #copyLinkBtn          — Button
//   #totalClicks          — Text
//   #totalConversions     — Text
//   #totalEarnings        — Text
//   #pendingPayout        — Text
//   #conversionsRepeater  — Repeater: recent conversions
//     #convDate           — Text
//     #convAmount         — Text
//     #convCommission     — Text
//   #noDataMsg            — Box (shown if no conversions yet)
//   #loadingSpinner       — Image/Animation

import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { getAffiliateDashboard, getAffiliateConversions } from 'backend/affiliates.web';

$w.onReady(async function () {
    if ($w('#loadingSpinner').length) $w('#loadingSpinner').show();
    if ($w('#noDataMsg').length) $w('#noDataMsg').hide();

    const member = await guardAuth();
    if (!member) return;

    await loadDashboard(member);

    if ($w('#loadingSpinner').length) $w('#loadingSpinner').hide();
});

async function guardAuth() {
    try {
        const member = await currentMember.getMember();
        if (!member) {
            wixLocation.to('/login?redirect=/affiliate-dashboard');
            return null;
        }
        return member;
    } catch (_) {
        wixLocation.to('/login?redirect=/affiliate-dashboard');
        return null;
    }
}

async function loadDashboard(member) {
    try {
        const data = await getAffiliateDashboard(member.loginEmail);

        const affiliateUrl = `https://www.ambitiouslybybobo.com/shop?ref=${data.affiliateCode || ''}`;

        if ($w('#affiliateCode').length) {
            $w('#affiliateCode').text = data.affiliateCode || '—';
        }
        if ($w('#affiliateLinkDisplay').length) {
            $w('#affiliateLinkDisplay').text = affiliateUrl;
        }
        if ($w('#copyLinkBtn').length) {
            $w('#copyLinkBtn').onClick(() =>
                wixLocation.to(`/affiliate-share?code=${encodeURIComponent(data.affiliateCode || '')}`)
            );
        }

        if ($w('#totalClicks').length) $w('#totalClicks').text = String(data.totalClicks ?? 0);
        if ($w('#totalConversions').length) $w('#totalConversions').text = String(data.totalConversions ?? 0);
        if ($w('#totalEarnings').length) {
            $w('#totalEarnings').text = `$${Number(data.totalEarnings ?? 0).toFixed(2)} CAD`;
        }
        if ($w('#pendingPayout').length) {
            $w('#pendingPayout').text = `$${Number(data.pendingPayout ?? 0).toFixed(2)} CAD`;
        }

        await loadConversions(member.loginEmail, data.totalConversions);
    } catch (_) {
        if ($w('#noDataMsg').length) $w('#noDataMsg').show();
    }
}

async function loadConversions(email, totalCount) {
    if (!$w('#conversionsRepeater').length) return;

    if (!totalCount) {
        if ($w('#noDataMsg').length) $w('#noDataMsg').show();
        return;
    }

    try {
        const { conversions } = await getAffiliateConversions(email, 1, 20);
        if (!conversions?.length) {
            if ($w('#noDataMsg').length) $w('#noDataMsg').show();
            return;
        }

        $w('#conversionsRepeater').data = conversions;
        $w('#conversionsRepeater').onItemReady(($item, conv) => {
            if ($item('#convDate').length) {
                $item('#convDate').text = new Date(conv.convertedAt).toLocaleDateString('en-CA', {
                    year: 'numeric', month: 'short', day: 'numeric',
                });
            }
            if ($item('#convAmount').length) {
                $item('#convAmount').text = `$${Number(conv.purchaseAmount).toFixed(2)}`;
            }
            if ($item('#convCommission').length) {
                $item('#convCommission').text = `+$${Number(conv.commissionEarned).toFixed(2)}`;
            }
        });
    } catch (_) {
        if ($w('#noDataMsg').length) $w('#noDataMsg').show();
    }
}
