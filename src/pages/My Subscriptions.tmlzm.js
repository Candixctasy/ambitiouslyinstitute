// My Subscriptions — full Subscribe & Save management dashboard.
// Shows all active product subscriptions, next renewal dates, and lets members
// change their delivery interval or cancel.
//
// Wix elements expected:
//   #subscriptionsRepeater   — Repeater: one card per active subscription
//     #subProductName        — Text
//     #subPrice              — Text
//     #subIntervalLabel      — Text: e.g. "Every 30 Days"
//     #subNextRenewal        — Text
//     #subIntervalDropdown   — Dropdown: change interval
//     #updateIntervalBtn     — Button
//     #cancelSubBtn          — Button
//   #noSubscriptionsMsg      — Box (shown when no subscriptions)
//   #viewPlansBtn            — Button
//   #loadingSpinner          — Image/Animation
//   #renewalReminderNote     — Text: renewal reminder copy

import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { getProductSubscriptions, cancelProductSubscription, updateSubscriptionInterval } from 'backend/subscriptions.web';

$w.onReady(async function () {
    if ($w('#loadingSpinner').length) $w('#loadingSpinner').show();
    if ($w('#noSubscriptionsMsg').length) $w('#noSubscriptionsMsg').hide();

    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=/my-subscriptions'); return; }

        await loadSubscriptions(member.loginEmail);

        if ($w('#renewalReminderNote').length) {
            $w('#renewalReminderNote').text =
                "3 days before each renewal, we'll email you so you can add on an extra " +
                "serum or modify your order before it ships.";
            $w('#renewalReminderNote').show();
        }
    } catch (_) {
        wixLocation.to('/login?redirect=/my-subscriptions');
    } finally {
        if ($w('#loadingSpinner').length) $w('#loadingSpinner').hide();
    }

    if ($w('#viewPlansBtn').length) $w('#viewPlansBtn').onClick(() => wixLocation.to('/plans-pricing'));
});

async function loadSubscriptions(email) {
    const { subscriptions } = await getProductSubscriptions(email);

    if (!subscriptions?.length) {
        if ($w('#noSubscriptionsMsg').length) $w('#noSubscriptionsMsg').show();
        return;
    }

    if (!$w('#subscriptionsRepeater').length) return;

    $w('#subscriptionsRepeater').data = subscriptions;

    $w('#subscriptionsRepeater').onItemReady(($item, sub) => {
        if ($item('#subProductName').length) {
            $item('#subProductName').text = sub.productName || sub.productId;
        }
        if ($item('#subPrice').length) {
            $item('#subPrice').text = `$${Number(sub.pricePerDelivery ?? 0).toFixed(2)} CAD (10% off)`;
        }
        if ($item('#subIntervalLabel').length) {
            $item('#subIntervalLabel').text = `Every ${sub.intervalDays} days`;
        }
        if ($item('#subNextRenewal').length && sub.nextRenewalDate) {
            $item('#subNextRenewal').text = `Next delivery: ${new Date(sub.nextRenewalDate).toLocaleDateString('en-CA', {
                year: 'numeric', month: 'long', day: 'numeric',
            })}`;
        }

        // Interval change dropdown
        if ($item('#subIntervalDropdown').length) {
            $item('#subIntervalDropdown').options = [
                { label: 'Every 30 Days (Most Popular)', value: '30' },
                { label: 'Every 60 Days', value: '60' },
                { label: 'Every 90 Days (Best Value)', value: '90' },
            ];
            $item('#subIntervalDropdown').value = String(sub.intervalDays);
        }

        if ($item('#updateIntervalBtn').length) {
            $item('#updateIntervalBtn').onClick(async () => {
                const newInterval = Number($item('#subIntervalDropdown').value || sub.intervalDays);
                $item('#updateIntervalBtn').disable();
                try {
                    await updateSubscriptionInterval(email, sub.subscriptionId, newInterval);
                    if ($item('#subIntervalLabel').length) {
                        $item('#subIntervalLabel').text = `Every ${newInterval} days`;
                    }
                } catch (_) {}
                $item('#updateIntervalBtn').enable();
            });
        }

        if ($item('#cancelSubBtn').length) {
            $item('#cancelSubBtn').onClick(async () => {
                $item('#cancelSubBtn').disable();
                try {
                    await cancelProductSubscription(email, sub.subscriptionId);
                    // Remove the cancelled card from the repeater data
                    const remaining = $w('#subscriptionsRepeater').data.filter(
                        s => s.subscriptionId !== sub.subscriptionId
                    );
                    $w('#subscriptionsRepeater').data = remaining;
                    if (!remaining.length && $w('#noSubscriptionsMsg').length) {
                        $w('#noSubscriptionsMsg').show();
                    }
                } catch (_) {
                    $item('#cancelSubBtn').enable();
                }
            });
        }
    });
}
