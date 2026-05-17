import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
import { askCAI } from 'backend/cai.web';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        if (!member) {
            if ($w('#commentInput').length > 0) $w('#commentInput').disable();
            if ($w('#commentHint').length > 0) { $w('#commentHint').text = 'Log in to join the conversation.'; $w('#commentHint').show(); }
        }
    } catch (_) {}
});
