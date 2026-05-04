import wixLocation from 'wix-location';

$w.onReady(function () {
    const name = wixLocation.query?.name || '';
    const source = wixLocation.query?.source || 'order';

    if ($w('#thankYouMsg').length > 0) {
        const messages = {
            order: `Thank you${name ? ', ' + name : ''}! Your order is confirmed.`,
            booking: `Thank you${name ? ', ' + name : ''}! Your booking is confirmed.`,
            application: `Thank you${name ? ', ' + name : ''}! We'll be in touch within 48 hours.`,
            alist: `Welcome to The A List${name ? ', ' + name : ''}! Your membership is active.`,
        };
        $w('#thankYouMsg').text = messages[source] || messages.order;
    }

    if ($w('#continueShoppingBtn').length > 0) $w('#continueShoppingBtn').onClick(() => wixLocation.to('/shop'));
    if ($w('#myAccountBtn').length > 0) $w('#myAccountBtn').onClick(() => wixLocation.to('/my-account'));
    if ($w('#homeBtn').length > 0) $w('#homeBtn').onClick(() => wixLocation.to('/'));
});
