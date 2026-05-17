import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    if ($w('#rsvpBtn').length > 0) {
        $w('#rsvpBtn').onClick(async () => {
            try {
                const member = await currentMember.getMember();
                if (!member) { wixLocation.to('/login?redirect=' + wixLocation.url); return; }
                $w('#rsvpBtn').disable();
                $w('#rsvpSuccess').show();
            } catch (_) { wixLocation.to('/login?redirect=' + wixLocation.url); }
        });
    }
    if ($w('#backToEventsBtn').length > 0) {
        $w('#backToEventsBtn').onClick(() => wixLocation.to('/events'));
    }
});
