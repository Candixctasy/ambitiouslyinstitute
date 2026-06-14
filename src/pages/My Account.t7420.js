// My Account / Student Dashboard page.
// Displays program enrollments, lesson progress, and past SKI assessments.
// Wix elements expected:
//   #welcomeText        — Text: personalised greeting
//   #enrollmentsRepeater — Repeater: one card per enrolled program
//     #programTitle     — Text (inside repeater)
//     #progressBar      — ProgressBar (inside repeater)
//     #progressLabel    — Text (inside repeater)
//     #continueButton   — Button (inside repeater)
//   #skiRepeater        — Repeater: one card per SKI assessment
//     #skiDate          — Text (inside repeater)
//     #skiStatus        — Text (inside repeater)
//     #skiSkinType      — Text (inside repeater)
//   #noEnrollments      — Box (shown when no programs enrolled)
//   #noSKI              — Box (shown when no assessments)
//   #loadingSpinner     — Image/Animation
//   #errorMessage       — Text (hidden by default)

import { getInstituteEnrollments, getClientAssessments } from "backend/database.web";
import { getAListProfile, getActiveDiscount, getReferralStats } from "backend/alist.web";
import { currentMember } from "wix-members";
import wixLocation from "wix-location";

const PROGRAMS = ["eba-core", "revenue-architecture", "territory-strategy"];

$w.onReady(async function () {
    $w("#errorMessage").hide();
    $w("#noEnrollments").hide();
    $w("#noSKI").hide();

    const member = await currentMember.getMember().catch(() => null);

    if (!member) {
        wixLocation.to("/login?redirect=/my-account");
        return;
    }

    const firstName = member.profile?.nickname || member.loginEmail?.split("@")[0] || "there";
    $w("#welcomeText").text = `Welcome back, ${firstName}.`;

    await Promise.all([
        loadEnrollments(member._id),
        loadSKIAssessments(member.loginEmail),
        loadAListPanel(member.loginEmail),
    ]);

    $w("#loadingSpinner").hide();
});

async function loadEnrollments(memberId) {
    try {
        const allEnrollments = (
            await Promise.all(PROGRAMS.map((pid) => getInstituteEnrollments(pid)))
        )
            .flatMap((r) => r.enrollments || [])
            .filter((e) => e.memberId === memberId);

        if (allEnrollments.length === 0) {
            $w("#noEnrollments").show();
            return;
        }

        $w("#enrollmentsRepeater").data = allEnrollments;

        $w("#enrollmentsRepeater").onItemReady(($item, itemData) => {
            $item("#programTitle").text = itemData.programTitle || itemData.programId;

            const pct = Math.round((itemData.completedLessons / itemData.totalLessons) * 100) || 0;
            $item("#progressBar").value = pct;
            $item("#progressLabel").text = `${pct}% complete`;

            $item("#continueButton").onClick(() =>
                wixLocation.to(`/learn/${itemData.programId}`)
            );
        });
    } catch (err) {
        console.error("Failed to load enrollments:", err);
        showError("Could not load your programs. Please refresh.");
    }
}

async function loadSKIAssessments(email) {
    if (!email) {
        $w("#noSKI").show();
        return;
    }

    try {
        const { assessments } = await getClientAssessments(email);

        if (!assessments || assessments.length === 0) {
            $w("#noSKI").show();
            return;
        }

        $w("#skiRepeater").data = assessments;

        $w("#skiRepeater").onItemReady(($item, itemData) => {
            $item("#skiDate").text = new Date(itemData.submittedAt).toLocaleDateString(
                "en-CA",
                { year: "numeric", month: "long", day: "numeric" }
            );
            $item("#skiStatus").text = formatStatus(itemData.status);
            $item("#skiSkinType").text = itemData.skinType || "—";
        });
    } catch (err) {
        console.error("Failed to load SKI assessments:", err);
    }
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

async function loadAListPanel(email) {
    if (!email) return;
    try {
        const [{ member }, { discount, isBirthday, baseDiscount, birthdayBonus }, { confirmed, pending, total }] = await Promise.all([
            getAListProfile(email).catch(() => ({ member: null })),
            getActiveDiscount(email, "consumer").catch(() => ({ discount: 0 })),
            getReferralStats(email).catch(() => ({ confirmed: 0, pending: 0, total: 0 })),
        ]);

        if (!member) return;

        if ($w("#alistTierLabel").length > 0) {
            const tier = member.tier === "professional" ? "Professional" : "Consumer";
            $w("#alistTierLabel").text = `A List — ${tier} Tier`;
            $w("#alistTierLabel").show();
        }

        if (discount > 0 && $w("#alistDiscountLabel").length > 0) {
            const base = `${baseDiscount || discount}% always`;
            const birthday = isBirthday ? ` + ${birthdayBonus}% birthday bonus active today` : "";
            $w("#alistDiscountLabel").text = `Your discount: ${base}${birthday}`;
            $w("#alistDiscountLabel").show();
        }

        if (total > 0 && $w("#referralStats").length > 0) {
            $w("#referralStats").text = `Referrals: ${confirmed} confirmed, ${pending} pending`;
            $w("#referralStats").show();
        }

        if ($w("#alistPanel").length > 0) $w("#alistPanel").show();
    } catch (_) {}
}

function showError(msg) {
    $w("#errorMessage").text = msg;
    $w("#errorMessage").show();
}
