// Booking / Application form page.
// Handles both the Institute application form and the SKI skin assessment form.
// Wix elements expected on this page:
//   #formType       — Dropdown: "institute-application" | "ski-assessment"
//   #fullName       — TextInput
//   #email          — TextInput
//   #phone          — TextInput (optional)
//   #role           — Dropdown (solo professional, team member, owner, educator)
//   #primaryGoal    — Dropdown
//   #challenge      — TextArea
//   #submitButton   — Button
//   #successMessage — Text (hidden by default)
//   #errorMessage   — Text (hidden by default)
//   #loadingSpinner — Image/Animation (hidden by default)
//   --- SKI-only fields (shown/hidden based on formType) ---
//   #skiSection     — Box containing all SKI-specific fields
//   #skinType       — Dropdown
//   #skinConcerns   — CheckboxGroup
//   #budget         — Dropdown
//   #frontPhoto     — UploadButton
//   #leftPhoto      — UploadButton
//   #rightPhoto     — UploadButton

import { saveSKIAssessment, upsertContact } from "backend/database.web";
import { getCAIRecommendations } from "backend/cai.web";
import wixLocation from "wix-location";

$w.onReady(function () {
    $w("#successMessage").hide();
    $w("#errorMessage").hide();
    $w("#loadingSpinner").hide();
    $w("#skiSection").hide();

    $w("#formType").onChange(() => toggleSKIFields());
    $w("#submitButton").onClick(() => handleSubmit());
});

function toggleSKIFields() {
    const type = $w("#formType").value;
    if (type === "ski-assessment") {
        $w("#skiSection").show();
    } else {
        $w("#skiSection").hide();
    }
}

async function handleSubmit() {
    const type = $w("#formType").value;
    const fullName = $w("#fullName").value.trim();
    const email = $w("#email").value.trim();

    if (!fullName || !email) {
        showError("Please fill in your name and email.");
        return;
    }

    setLoading(true);

    try {
        const contact = {
            fullName,
            email,
            phone: $w("#phone").value.trim() || null,
            role: $w("#role").value,
            primaryGoal: $w("#primaryGoal").value,
            challenge: $w("#challenge").value.trim(),
            source: type,
            submittedAt: new Date().toISOString(),
        };

        await upsertContact(contact);

        if (type === "ski-assessment") {
            await submitSKIAssessment(email, fullName);
        } else {
            await submitInstituteApplication(contact);
        }

        setLoading(false);
        $w("#successMessage").show();
        $w("#submitButton").disable();
    } catch (err) {
        console.error("Form submission error:", err);
        setLoading(false);
        showError("Something went wrong. Please try again or email us directly.");
    }
}

async function submitSKIAssessment(email, fullName) {
    const assessment = {
        email,
        fullName,
        skinType: $w("#skinType").value,
        skinConcerns: $w("#skinConcerns").value,
        budget: $w("#budget").value,
    };

    const [frontUpload, leftUpload, rightUpload] = await Promise.all([
        $w("#frontPhoto").uploadFiles(),
        $w("#leftPhoto").uploadFiles(),
        $w("#rightPhoto").uploadFiles(),
    ]);

    assessment.photos = {
        front: frontUpload[0]?.url || null,
        left: leftUpload[0]?.url || null,
        right: rightUpload[0]?.url || null,
    };

    await saveSKIAssessment(assessment);

    // Get initial C-Ai recommendations while assessment awaits Conrad's review
    const recs = await getCAIRecommendations({
        skinType: assessment.skinType,
        concerns: assessment.skinConcerns,
        budget: assessment.budget,
        role: "consumer",
    }).catch(() => null);

    if (recs) {
        $w("#caiRecommendations").text = recs.recommendations;
        $w("#caiSection").show();
    }

    wixLocation.to("/ski-success");
}

async function submitInstituteApplication(contact) {
    wixLocation.to("/thank-you?name=" + encodeURIComponent(contact.fullName));
}

function setLoading(state) {
    if (state) {
        $w("#loadingSpinner").show();
        $w("#submitButton").disable();
    } else {
        $w("#loadingSpinner").hide();
        $w("#submitButton").enable();
    }
}

function showError(msg) {
    $w("#errorMessage").text = msg;
    $w("#errorMessage").show();
    setTimeout(() => $w("#errorMessage").hide(), 5000);
}
