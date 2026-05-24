// My Account / Student Dashboard page.
// Displays program enrollments, lesson progress, past SKI assessments,
// and affiliate dashboard summary for Institute graduates.
//
// Wix elements expected:
//   #welcomeText            — Text: personalised greeting
//   #enrollmentsRepeater    — Repeater: one card per enrolled program
//     #programTitle         — Text (inside repeater)
//     #progressBar          — ProgressBar (inside repeater)
//     #progressLabel        — Text (inside repeater)
//     #continueButton       — Button (inside repeater)
//     #midCourseKitBanner   — Box (shown at 50% progress)
//   #skiRepeater            — Repeater: one card per SKI assessment
//     #skiDate              — Text (inside repeater)
//     #skiStatus            — Text (inside repeater)
//     #skiSkinType          — Text (inside repeater)
//   #affiliateSection       — Box (hidden if no affiliate account)
//   #affiliateCodeDisplay   — Text
//   #affiliateEarnings      — Text
//   #viewAffiliateDashBtn   — Button
//   #noEnrollments          — Box (shown when no programs enrolled)
//   #noSKI                  — Box (shown when no assessments)
//   #loadingSpinner         — Image/Animation
//   #errorMessage           — Text (hidden by default)

import { getInstituteEnrollments, getClientAssessments } from "backend/database.web";
import { getAffiliateDashboard } from "backend/affiliates.web";
import { currentMember } from "wix-members";
import wixLocation from "wix-location";

const PROGRAMS = ["eba-core", "revenue-architecture", "territory-strategy"];

$w.onReady(async function () {
    if ($w("#errorMessage").length) $w("#errorMessage").hide();
    if ($w("#noEnrollments").length) $w("#noEnrollments").hide();
    if ($w("#noSKI").length) $w("#noSKI").hide();
    if ($w("#affiliateSection").length) $w("#affiliateSection").hide();

    const member = await currentMember.getMember().catch(() => null);

    if (!member) {
        wixLocation.to("/login?redirect=/my-account");
        return;
    }

    const firstName = member.profile?.nickname || member.loginEmail?.split("@")[0] || "there";
    if ($w("#welcomeText").length) $w("#welcomeText").text = `Welcome back, ${firstName}.`;

    await Promise.all([
        loadEnrollments(member._id, member.loginEmail),
        loadSKIAssessments(member.loginEmail),
        loadAffiliateSummary(member.loginEmail),
    ]);

    if ($w("#loadingSpinner").length) $w("#loadingSpinner").hide();
});

async function loadEnrollments(memberId, email) {
    try {
        const allEnrollments = (
            await Promise.all(PROGRAMS.map((pid) => getInstituteEnrollments(pid)))
        )
            .flatMap((r) => r.enrollments || [])
            .filter((e) => e.memberId === memberId);

        if (allEnrollments.length === 0) {
            if ($w("#noEnrollments").length) $w("#noEnrollments").show();
            return;
        }

        if (!$w("#enrollmentsRepeater").length) return;

        $w("#enrollmentsRepeater").data = allEnrollments;

        $w("#enrollmentsRepeater").onItemReady(($item, itemData) => {
            if ($item("#programTitle").length) {
                $item("#programTitle").text = itemData.programTitle || itemData.programId;
            }

            const pct = Math.round((itemData.completedLessons / itemData.totalLessons) * 100) || 0;
            if ($item("#progressBar").length) $item("#progressBar").value = pct;
            if ($item("#progressLabel").length) $item("#progressLabel").text = `${pct}% complete`;

            // Show student kit upsell banner at the 50% milestone
            if ($item("#midCourseKitBanner").length) {
                if (pct >= 50 && pct < 100) {
                    $item("#midCourseKitBanner").show();
                } else {
                    $item("#midCourseKitBanner").hide();
                }
            }

            if ($item("#continueButton").length) {
                $item("#continueButton").onClick(() =>
                    wixLocation.to(`/learn/${itemData.programId}`)
                );
            }
        });
    } catch (err) {
        console.error("Failed to load enrollments:", err);
        showError("Could not load your programs. Please refresh.");
    }
}

async function loadSKIAssessments(email) {
    if (!email) {
        if ($w("#noSKI").length) $w("#noSKI").show();
        return;
    }

    try {
        const { assessments } = await getClientAssessments(email);

        if (!assessments || assessments.length === 0) {
            if ($w("#noSKI").length) $w("#noSKI").show();
            return;
        }

        if (!$w("#skiRepeater").length) return;

        $w("#skiRepeater").data = assessments;

        $w("#skiRepeater").onItemReady(($item, itemData) => {
            if ($item("#skiDate").length) {
                $item("#skiDate").text = new Date(itemData.submittedAt).toLocaleDateString(
                    "en-CA",
                    { year: "numeric", month: "long", day: "numeric" }
                );
            }
            if ($item("#skiStatus").length) $item("#skiStatus").text = formatStatus(itemData.status);
            if ($item("#skiSkinType").length) $item("#skiSkinType").text = itemData.skinType || "—";
        });
    } catch (err) {
        console.error("Failed to load SKI assessments:", err);
    }
}

async function loadAffiliateSummary(email) {
    try {
        const data = await getAffiliateDashboard(email);
        if (!data?.affiliateCode) return;

        if ($w("#affiliateSection").length) $w("#affiliateSection").show();

        if ($w("#affiliateCodeDisplay").length) {
            $w("#affiliateCodeDisplay").text = `Your referral code: ${data.affiliateCode}`;
        }
        if ($w("#affiliateEarnings").length) {
            $w("#affiliateEarnings").text =
                `Total earned: $${Number(data.totalEarnings ?? 0).toFixed(2)} CAD ` +
                `(${data.totalConversions ?? 0} referral${data.totalConversions === 1 ? '' : 's'})`;
        }
        if ($w("#viewAffiliateDashBtn").length) {
            $w("#viewAffiliateDashBtn").onClick(() => wixLocation.to("/affiliate-dashboard"));
        }
    } catch (_) {}
}

function formatStatus(status) {
    const map = {
        pending_review: "Awaiting Review",
        reviewed: "Review Complete",
        formulation_sent: "Formulation Sent",
        ordered: "Order Placed",
        shipped: "Shipped",
    };
    return map[status] || status;
}

function showError(msg) {
    if ($w("#errorMessage").length) {
        $w("#errorMessage").text = msg;
        $w("#errorMessage").show();
    }
}
