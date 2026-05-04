import wixLocation from 'wix-location';

$w.onReady(function () {
    if ($w('#gallery').length > 0) {
        $w('#gallery').onItemClicked((event) => {
            const item = event.item;
            if (item?.link) wixLocation.to(item.link);
        });
    }
});
