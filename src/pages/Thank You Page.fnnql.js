// Thank You / confirmation page shown after a successful application or purchase.
// Wix elements expected:
//   #heroHeading      — Text: personalised greeting
//   #subMessage       — Text: next-steps message
//   #caiTip           — Text: C-Ai generated tip (hidden until loaded)
//   #caiSection       — Box wrapping #caiTip (hidden by default)
//   #ctaButton        — Button: navigates to next logical step
//   #loadingSpinner   — Image/Animation (hidden by default)

import { askCAI } from "backend/cai.web";
import wixLocation from "wix-location";

$w.onReady(async function () {
    $w("#caiSection").hide();
    $w("#loadingSpinner").hide();

    const params = new URLSearchParams(wixLocation.query);
    const name = params.get("name") || "there";
    const source = params.get("source") || "institute-application";

    personalise(name, source);
    await loadCAITip(source);
});

function personalise(name, source) {
    const firstName = name.split(" ")[0];

    if (source === "ski-assessment") {
        $w("#heroHeading").text = `Thank you, ${firstName}!`;
        $w("#subMessage").text =
            "Your SKI assessment has been received. Conrad will personally review " +
            "your photos and profile within 24–48 hours. You'll receive your custom " +
            "formulation via email.";
        $w("#ctaButton").label = "Back to Home";
        $w("#ctaButton").onClick(() => wixLocation.to("/"));
    } else {
        $w("#heroHeading").text = `Application received, ${firstName}.`;
        $w("#subMessage").text =
            "You'll hear back within 48 hours. In the meantime, download the free " +
            "Consultation Script to get a head start.";
        $w("#ctaButton").label = "Download Free Script";
        $w("#ctaButton").onClick(() =>
            wixLocation.to("/free-consultation-script")
        );
    }
}

async function loadCAITip(source) {
    $w("#loadingSpinner").show();

    const question =
        source === "ski-assessment"
            ? "Give one actionable skincare tip a client can do at home tonight while they wait for their custom formulation."
            : "Give one mindset tip for a beauty professional who just applied to the Executive Beauty Operating System.";

    try {
        const result = await askCAI(question, { page: "thank-you", source });
        $w("#caiTip").text = result.answer;
        $w("#caiSection").show();
    } catch (err) {
        console.error("C-Ai tip failed:", err);
    } finally {
        $w("#loadingSpinner").hide();
    }
}
