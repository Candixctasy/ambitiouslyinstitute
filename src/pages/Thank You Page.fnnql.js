// Thank You / confirmation page shown after a successful application or purchase.
// Now includes a student kit upsell after course enrollment and a dual-brand
// cross-sell after any application.
//
// Wix elements expected:
//   #heroHeading          — Text: personalised greeting
//   #subMessage           — Text: next-steps message
//   #caiTip               — Text: C-Ai generated tip (hidden until loaded)
//   #caiSection           — Box wrapping #caiTip (hidden by default)
//   #ctaButton            — Button: navigates to next logical step
//   #loadingSpinner       — Image/Animation (hidden by default)
//   #studentKitSection    — Box: kit upsell (hidden until enrollment confirmed)
//   #kitCouponCode        — Text: displays STUDENTPRO coupon
//   #shopKitBtn           — Button: goes to ByBoBo kit page
//   #gradDiscountSection  — Box: grad-perk upsell (hidden by default)
//   #gradCouponCode       — Text
//   #gradShopBtn          — Button

import { askCAI } from "backend/cai.web";
import { getStudentKitBundle, getGradPerks } from "backend/ecosystem.web";
import { currentMember } from "wix-members";
import wixLocation from "wix-location";

$w.onReady(async function () {
    if ($w("#caiSection").length) $w("#caiSection").hide();
    if ($w("#loadingSpinner").length) $w("#loadingSpinner").hide();
    if ($w("#studentKitSection").length) $w("#studentKitSection").hide();
    if ($w("#gradDiscountSection").length) $w("#gradDiscountSection").hide();

    const params = new URLSearchParams(wixLocation.query);
    const name = params.get("name") || "there";
    const source = params.get("source") || "institute-application";
    const programId = params.get("program") || "";

    personalise(name, source);
    await Promise.all([
        loadCAITip(source),
        loadStudentKitUpsell(source, programId),
        loadGradDiscount(source),
    ]);
});

function personalise(name, source) {
    const firstName = name.split(" ")[0];

    const config = {
        "ski-assessment": {
            heading: `Thank you, ${firstName}!`,
            sub: "Your SKI assessment has been received. Conrad will personally review " +
                "your photos and profile within 24–48 hours. You'll receive your custom " +
                "formulation via email.",
            ctaLabel: "Back to Home",
            ctaUrl: "/",
        },
        enrollment: {
            heading: `You're enrolled, ${firstName}!`,
            sub: "Your student dashboard is now unlocked. Practice with professional-grade " +
                "formulations from day one — claim your Student Kit below.",
            ctaLabel: "Go to My Dashboard",
            ctaUrl: "/my-account",
        },
        default: {
            heading: `Application received, ${firstName}.`,
            sub: "You'll hear back within 48 hours. In the meantime, download the free " +
                "Consultation Script to get a head start.",
            ctaLabel: "Download Free Script",
            ctaUrl: "/free-consultation-script",
        },
    };

    const { heading, sub, ctaLabel, ctaUrl } = config[source] || config.default;

    if ($w("#heroHeading").length) $w("#heroHeading").text = heading;
    if ($w("#subMessage").length) $w("#subMessage").text = sub;
    if ($w("#ctaButton").length) {
        $w("#ctaButton").label = ctaLabel;
        $w("#ctaButton").onClick(() => wixLocation.to(ctaUrl));
    }
}

async function loadStudentKitUpsell(source, programId) {
    // Only show the kit upsell when the student just enrolled in a program
    if (source !== "enrollment") return;

    try {
        const { kit } = await getStudentKitBundle(programId);
        if (!kit) return;

        if ($w("#studentKitSection").length) $w("#studentKitSection").show("fade");
        if ($w("#kitCouponCode").length) $w("#kitCouponCode").text = "STUDENTPRO";

        if ($w("#shopKitBtn").length) {
            $w("#shopKitBtn").label = "Claim My Student Kit";
            $w("#shopKitBtn").onClick(() =>
                wixLocation.to(`/shop?collection=student-kits&coupon=STUDENTPRO&program=${encodeURIComponent(programId)}`)
            );
        }
    } catch (_) {}
}

async function loadGradDiscount(source) {
    // Show grad perks on the graduation/completion thank-you
    if (source !== "graduation") return;

    try {
        const member = await currentMember.getMember().catch(() => null);
        if (!member) return;

        const perks = await getGradPerks(member.loginEmail);
        if (!perks?.gradDiscountCode) return;

        if ($w("#gradDiscountSection").length) $w("#gradDiscountSection").show("fade");
        if ($w("#gradCouponCode").length) {
            $w("#gradCouponCode").text = perks.gradDiscountCode;
        }
        if ($w("#gradShopBtn").length) {
            $w("#gradShopBtn").label = "Shop with Grad Discount";
            $w("#gradShopBtn").onClick(() =>
                wixLocation.to(`/shop?coupon=${encodeURIComponent(perks.gradDiscountCode)}`)
            );
        }
    } catch (_) {}
}

async function loadCAITip(source) {
    if ($w("#loadingSpinner").length) $w("#loadingSpinner").show();

    const question =
        source === "ski-assessment"
            ? "Give one actionable skincare tip a client can do at home tonight while they wait for their custom formulation."
            : source === "enrollment"
            ? "Give one motivating tip for a beauty professional who just enrolled in their first professional certification program."
            : "Give one mindset tip for a beauty professional who just applied to the Executive Beauty Operating System.";

    try {
        const result = await askCAI(question, { page: "thank-you", source });
        if ($w("#caiTip").length) $w("#caiTip").text = result.answer;
        if ($w("#caiSection").length) $w("#caiSection").show();
    } catch (_) {}
    finally {
        if ($w("#loadingSpinner").length) $w("#loadingSpinner").hide();
    }
}
