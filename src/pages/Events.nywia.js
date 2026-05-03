// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';

$w.onReady(async function () {
    initFilters();
    await loadEvents();
});

function initFilters() {
    $w('#filterAll').onClick(() => filterEvents('all'));
    $w('#filterUpcoming').onClick(() => filterEvents('upcoming'));
    $w('#filterPast').onClick(() => filterEvents('past'));
}

async function loadEvents() {
    try {
        $w('#eventsRepeater').hide();
        $w('#loadingIndicator').show();

        const member = await currentMember.getMember().catch(() => null);
        const isLoggedIn = !!member;

        $w('#eventsRepeater').onItemReady(($item, itemData) => {
            $item('#eventTitle').text = itemData.title;
            $item('#eventDate').text = formatDate(itemData.scheduling?.config?.startDate);
            $item('#eventLocation').text = itemData.location?.address?.formatted || 'Online';
            $item('#eventDescription').text = itemData.description || '';

            const isFull = itemData.registration?.status === 'CLOSED_MANUALLY';
            $item('#rsvpButton').label = isFull ? 'Sold Out' : 'Register';
            $item('#rsvpButton').disable = isFull;

            $item('#rsvpButton').onClick(() => {
                if (!isLoggedIn) {
                    wixLocation.to('/login?redirect=' + wixLocation.url);
                    return;
                }
                wixLocation.to(`/events/${itemData.slug}`);
            });

            $item('#eventImage').src = itemData.mainImage?.url || '';
        });

        // Wix Events data is bound via the dataset connected in the editor.
        // The repeater uses the Events dataset; filter it to upcoming events by default.
        $w('#eventsDataset').setFilter(
            wixData.filter().ge('scheduling.config.startDate', new Date().toISOString())
        );

        $w('#loadingIndicator').hide();
        $w('#eventsRepeater').show();
    } catch (err) {
        console.error('Failed to load events:', err);
        $w('#loadingIndicator').hide();
        $w('#errorMessage').show();
    }
}

function filterEvents(filter) {
    const now = new Date().toISOString();

    if (filter === 'upcoming') {
        $w('#eventsDataset').setFilter(
            wixData.filter().ge('scheduling.config.startDate', now)
        );
    } else if (filter === 'past') {
        $w('#eventsDataset').setFilter(
            wixData.filter().lt('scheduling.config.startDate', now)
        );
    } else {
        $w('#eventsDataset').setFilter(wixData.filter());
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
