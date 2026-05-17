import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getInstituteEnrollments, saveStudentProgress } from 'backend/database.web';
import { askCAI } from 'backend/cai.web';

$w.onReady(async function () {
    const member = await guardAuth();
    if (!member) return;

    const lessonId = wixLocation.query?.lesson;
    if (lessonId) await loadLesson(lessonId, member);
    initNavigation(lessonId);
    initCAITutor(member);
});

async function guardAuth() {
    try {
        const member = await currentMember.getMember();
        if (!member) { wixLocation.to('/login?redirect=' + wixLocation.url); return null; }
        return member;
    } catch (_) { wixLocation.to('/login?redirect=' + wixLocation.url); return null; }
}

async function loadLesson(lessonId, member) {
    if ($w('#lessonTitle').length > 0) $w('#lessonTitle').text = `Lesson ${lessonId}`;
}

async function markComplete(lessonId, member) {
    try {
        await saveStudentProgress({ memberId: member.loginEmail, lessonId, completedAt: new Date().toISOString() });
        if ($w('#completionBadge').length > 0) { $w('#completionBadge').text = 'Lesson Complete'; $w('#completionBadge').show(); }
    } catch (_) {}
}

function initNavigation(currentLesson) {
    if ($w('#markCompleteBtn').length > 0) {
        $w('#markCompleteBtn').onClick(async () => {
            const member = await currentMember.getMember().catch(() => null);
            if (member && currentLesson) await markComplete(currentLesson, member);
        });
    }
    if ($w('#backToCurriculumBtn').length > 0) $w('#backToCurriculumBtn').onClick(() => wixLocation.to('/my-account'));
    if ($w('#nextLessonBtn').length > 0) {
        $w('#nextLessonBtn').onClick(() => {
            const next = currentLesson ? String(Number(currentLesson) + 1) : '1';
            wixLocation.to(`/executive-beauty-architects?lesson=${next}`);
        });
    }
}

function initCAITutor(member) {
    if (!$w('#caiInput').length) return;
    $w('#caiInput').onKeyPress(async (e) => {
        if (e.key !== 'Enter') return;
        const q = $w('#caiInput').value?.trim();
        if (!q) return;
        $w('#caiInput').value = '';
        if ($w('#caiResponse').length > 0) $w('#caiResponse').text = 'Thinking…';
        try {
            const res = await askCAI(q, 'institute-lesson');
            if ($w('#caiResponse').length > 0) $w('#caiResponse').text = res.answer || res.response || '';
        } catch (_) {
            if ($w('#caiResponse').length > 0) $w('#caiResponse').text = 'Error — please try again.';
        }
    });
}
