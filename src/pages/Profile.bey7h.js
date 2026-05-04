// Ambitiously Institute — Member Profile page

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) {
        wixLocation.to('/login?redirect=/profile');
        return;
    }
    populateProfile(member);
    initEditButton();
});

function populateProfile(member) {
    const name = [
        member.contactDetails?.firstName,
        member.contactDetails?.lastName,
    ].filter(Boolean).join(' ');

    try { $w('#profileName').text = name || 'Member'; } catch (_) {}
    try { $w('#profileEmail').text = member.loginEmail || ''; } catch (_) {}

    const joinDate = member.createdDate
        ? new Date(member.createdDate).toLocaleDateString('en-CA', {
              year: 'numeric', month: 'long', day: 'numeric',
          })
        : '';
    try { $w('#profileJoinDate').text = joinDate ? `Member since ${joinDate}` : ''; } catch (_) {}
}

function initEditButton() {
    try {
        $w('#editProfileBtn').onClick(() => wixLocation.to('/my-account'));
    } catch (_) {}
}
