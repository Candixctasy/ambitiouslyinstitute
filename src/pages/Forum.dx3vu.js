// Forum page — community Q&A powered by C-Ai.
// Members can ask questions and receive an instant C-Ai answer while waiting
// for peer/instructor responses.
// Wix elements expected:
//   #questionInput    — TextArea: the member's question
//   #askButton        — Button: submits to C-Ai
//   #caiAnswer        — Text: C-Ai response (hidden by default)
//   #caiAnswerBox     — Box wrapping #caiAnswer (hidden by default)
//   #loadingSpinner   — Image/Animation (hidden by default)
//   #charCount        — Text: live character count
//   #errorMessage     — Text (hidden by default)
//   #forum1           — Wix Forum widget (standard element)

import { askCAI } from "backend/cai.web";
import { currentMember } from "wix-members";

const MAX_CHARS = 1000;

$w.onReady(async function () {
    $w("#caiAnswerBox").hide();
    $w("#loadingSpinner").hide();
    $w("#errorMessage").hide();

    const member = await currentMember.getMember().catch(() => null);

    if (!member) {
        $w("#askButton").disable();
        $w("#questionInput").placeholder =
            "Log in to ask C-Ai a question";
        return;
    }

    $w("#questionInput").onInput(() => updateCharCount());
    $w("#askButton").onClick(() => handleAsk(member));
});

function updateCharCount() {
    const len = $w("#questionInput").value.length;
    $w("#charCount").text = `${len} / ${MAX_CHARS}`;

    if (len > MAX_CHARS) {
        $w("#charCount").style.color = "#cc0000";
        $w("#askButton").disable();
    } else {
        $w("#charCount").style.color = "#666";
        $w("#askButton").enable();
    }
}

async function handleAsk(member) {
    const question = $w("#questionInput").value.trim();

    if (!question) return;

    $w("#caiAnswerBox").hide();
    $w("#loadingSpinner").show();
    $w("#askButton").disable();

    try {
        const result = await askCAI(question, {
            page: "forum",
            role: member.profile?.title || "member",
            sessionId: member._id,
        });

        $w("#caiAnswer").text = result.answer;
        $w("#caiAnswerBox").show();
    } catch (err) {
        console.error("C-Ai forum error:", err);
        $w("#errorMessage").text =
            "C-Ai is unavailable right now. Post your question for the community.";
        $w("#errorMessage").show();
        setTimeout(() => $w("#errorMessage").hide(), 5000);
    } finally {
        $w("#loadingSpinner").hide();
        $w("#askButton").enable();
    }
}
