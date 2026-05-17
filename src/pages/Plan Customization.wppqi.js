import wixLocation from 'wix-location';

$w.onReady(function () {
    if ($w('#customizePlanWidget').length > 0) $w('#customizePlanWidget').show();
    if ($w('#backToPlansBtn').length > 0) $w('#backToPlansBtn').onClick(() => wixLocation.to('/plans-pricing'));
    if ($w('#continueBtn').length > 0) $w('#continueBtn').onClick(() => wixLocation.to('/checkout'));
});
