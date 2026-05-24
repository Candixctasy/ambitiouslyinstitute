// Product Page — individual product view with A-List pricing,
// Subscribe & Save toggle, and ingredient-linked product bridge.
//
// Wix elements expected:
//   #productName          — Text
//   #productDescription   — Text
//   #productPrice         — Text
//   #productImage         — Image
//   #productCategory      — Text
//   #addToCartBtn         — Button
//   #buyNowBtn            — Button
//   #alistPrice           — Text (hidden by default)
//   #subscribeSection     — Box: Subscribe & Save panel
//   #subscribeToggle      — Checkbox or Switch
//   #intervalDropdown     — Dropdown: 30 / 60 / 90 days
//   #subscribeSaveLabel   — Text: shows "Save 10% — $XX.XX/delivery"
//   #subscribeBtn         — Button: creates subscription
//   #ingredientBridgeSection — Box (hidden by default)
//   #ingredientBridgeText — Text: "This product contains: X, Y, Z"
//   #viewIngredientBtn    — Button: goes to encyclopedia entry
//   #errorMsg             — Text (hidden by default)

import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';
import { getByBoBoProducts } from 'backend/database.web';
import { createProductSubscription, getSubscriptionIntervalOptions } from 'backend/subscriptions.web';

let _currentProduct = null;
let _currentMember = null;

$w.onReady(async function () {
    const productId = wixLocation.query?.id || wixLocation.path[wixLocation.path.length - 1];
    await loadProduct(productId);
    initAddToCart();
    await Promise.all([
        applyAListPricing(),
        initSubscribeAndSave(productId),
    ]);
});

async function loadProduct(productId) {
    if (!productId) { wixLocation.to('/shop'); return; }
    try {
        const { products } = await getByBoBoProducts();
        const product = products?.find(p => p.productId === productId || p.slug === productId);
        if (!product) { wixLocation.to('/shop'); return; }

        _currentProduct = product;

        if ($w('#productName').length) $w('#productName').text = product.name || '';
        if ($w('#productDescription').length) $w('#productDescription').text = product.description || '';
        if ($w('#productPrice').length) $w('#productPrice').text = `$${Number(product.price).toFixed(2)}`;
        if ($w('#productImage').length && product.imageUrl) $w('#productImage').src = product.imageUrl;
        if ($w('#productCategory').length) $w('#productCategory').text = product.category || '';

        if ($w('#addToCartBtn').length) $w('#addToCartBtn').customClassList.remove('hidden');

        // Ingredient bridge — link back to encyclopedia
        if (product.keyIngredients?.length && $w('#ingredientBridgeSection').length) {
            $w('#ingredientBridgeSection').show();
            if ($w('#ingredientBridgeText').length) {
                $w('#ingredientBridgeText').text = `Key ingredients: ${product.keyIngredients.join(', ')}`;
            }
            if ($w('#viewIngredientBtn').length && product.keyIngredients[0]) {
                const slug = product.keyIngredients[0].toLowerCase().replace(/\s+/g, '-');
                $w('#viewIngredientBtn').label = `Learn about ${product.keyIngredients[0]}`;
                $w('#viewIngredientBtn').onClick(() =>
                    wixLocation.to(`/ingredients/${slug}`)
                );
            }
        }
    } catch (_) {
        if ($w('#errorMsg').length) $w('#errorMsg').show();
    }
}

function initAddToCart() {
    if ($w('#addToCartBtn').length) {
        $w('#addToCartBtn').onClick(() => wixLocation.to('/cart'));
    }
    if ($w('#buyNowBtn').length) {
        $w('#buyNowBtn').onClick(() => wixLocation.to('/checkout'));
    }
}

async function applyAListPricing() {
    try {
        const member = await currentMember.getMember();
        _currentMember = member;
        if (!member) return;
        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (!discount || !$w('#alistPrice').length) return;
        const base = parseFloat($w('#productPrice').text?.replace('$', '') || '0');
        const sale = (base * (1 - discount / 100)).toFixed(2);
        $w('#alistPrice').text = `A List Price: $${sale}${isBirthday ? ' 🎂' : ''}`;
        $w('#alistPrice').show();
    } catch (_) {}
}

async function initSubscribeAndSave(productId) {
    if (!$w('#subscribeSection').length) return;

    try {
        const { options, discountPct } = await getSubscriptionIntervalOptions();

        // Populate the interval dropdown
        if ($w('#intervalDropdown').length) {
            $w('#intervalDropdown').options = options.map(o => ({
                label: o.badge ? `${o.label} (${o.badge})` : o.label,
                value: String(o.days),
            }));
            // Default to 30-day (most popular)
            $w('#intervalDropdown').value = '30';
        }

        updateSubscribeSaveLabel(discountPct, 30);

        if ($w('#intervalDropdown').length) {
            $w('#intervalDropdown').onChange(e => {
                updateSubscribeSaveLabel(discountPct, Number(e.target.value));
            });
        }

        if ($w('#subscribeToggle').length) {
            $w('#subscribeToggle').onChange(e => {
                if (e.target.checked) {
                    $w('#intervalDropdown').show();
                    $w('#subscribeSaveLabel').show();
                    $w('#subscribeBtn').show();
                } else {
                    $w('#intervalDropdown').hide();
                    $w('#subscribeSaveLabel').hide();
                    $w('#subscribeBtn').hide();
                }
            });
            // Start collapsed
            $w('#intervalDropdown').hide();
            $w('#subscribeSaveLabel').hide();
            if ($w('#subscribeBtn').length) $w('#subscribeBtn').hide();
        }

        if ($w('#subscribeBtn').length) {
            $w('#subscribeBtn').onClick(() => handleSubscribe(productId, discountPct));
        }
    } catch (_) {}
}

function updateSubscribeSaveLabel(discountPct, days) {
    if (!_currentProduct || !$w('#subscribeSaveLabel').length) return;
    const base = Number(_currentProduct.price);
    const discounted = (base * (1 - discountPct / 100)).toFixed(2);
    $w('#subscribeSaveLabel').text =
        `Subscribe & Save ${discountPct}% — $${discounted} CAD every ${days} days`;
}

async function handleSubscribe(productId, discountPct) {
    if (!_currentMember) {
        wixLocation.to(`/login?redirect=${wixLocation.url}`);
        return;
    }

    const intervalDays = Number($w('#intervalDropdown').length ? $w('#intervalDropdown').value : 30);

    if ($w('#subscribeBtn').length) $w('#subscribeBtn').disable();

    try {
        await createProductSubscription(_currentMember.loginEmail, productId, intervalDays);
        wixLocation.to(`/thank-you?source=subscription&name=${encodeURIComponent(
            _currentMember.profile?.nickname || _currentMember.loginEmail.split('@')[0]
        )}`);
    } catch (_) {
        if ($w('#errorMsg').length) {
            $w('#errorMsg').text = 'Could not start subscription — please try again.';
            $w('#errorMsg').show();
        }
        if ($w('#subscribeBtn').length) $w('#subscribeBtn').enable();
    }
}
