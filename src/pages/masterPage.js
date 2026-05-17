// Global site code — runs on every page of Ambitiously Institute

import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    await initMemberState();
});

async function initMemberState() {
    const member = await currentMember.getMember().catch(() => null);

    if (member) {
        // Show member-specific nav elements if they exist on this page
        tryShow('#memberNavItem');
        tryHide('#loginNavItem');
    } else {
        tryShow('#loginNavItem');
        tryHide('#memberNavItem');
    }
}

function tryShow(selector) {
    try { $w(selector).show(); } catch (_) {}
}

function tryHide(selector) {
    try { $w(selector).hide(); } catch (_) {}
}
