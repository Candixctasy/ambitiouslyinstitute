// Ambitiously Institute — Schedule / Book Online page

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    await guardAuth();
    initServiceFilters();
});

async function guardAuth() {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) {
        wixLocation.to('/login?redirect=' + encodeURIComponent(wixLocation.url));
    }
}

function initServiceFilters() {
    try {
        $w('#filterStrategy').onClick(() => filterServices('strategy'));
        $w('#filterProgram').onClick(() => filterServices('program'));
        $w('#filterAll').onClick(() => filterServices('all'));
    } catch (_) {}
}

function filterServices(category) {
    try {
        if (category === 'all') {
            $w('#servicesDataset').setFilter(wixData.filter());
        } else {
            $w('#servicesDataset').setFilter(
                wixData.filter().eq('category', category)
            );
        }
    } catch (_) {}
}
