import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { askCAI } from 'backend/cai.web';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) {
            if ($w('#newPostBtn').length > 0) $w('#newPostBtn').disable();
            if ($w('#memberOnlyMsg').length > 0) $w('#memberOnlyMsg').show();
            return;
        }
        if ($w('#newPostBtn').length > 0) $w('#newPostBtn').show();
    } catch (_) {}

    if ($w('#caiAnswerBtn').length > 0) {
        $w('#caiAnswerBtn').onClick(async () => {
            const q = $w('#caiQuestionInput')?.value?.trim();
            if (!q) return;
            $w('#caiAnswerBtn').disable();
            try {
                const res = await askCAI(q, 'forum');
                if ($w('#caiAnswer').length > 0) { $w('#caiAnswer').text = res.answer || res.response || ''; $w('#caiAnswer').show(); }
            } catch (_) {} finally { $w('#caiAnswerBtn').enable(); }
        });
    }
});
