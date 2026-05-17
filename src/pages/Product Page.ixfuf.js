import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { getActiveDiscount } from 'backend/alist.web';
import { getByBoBoProducts } from 'backend/database.web';

$w.onReady(async function () {
    const productId = wixLocation.query?.id || wixLocation.path[wixLocation.path.length - 1];
    await loadProduct(productId);
    initAddToCart();
    await applyAListPricing();
});

async function loadProduct(productId) {
    if (!productId) { wixLocation.to('/shop'); return; }
    try {
        const { products } = await getByBoBoProducts();
        const product = products?.find(p => p.productId === productId || p.slug === productId);
        if (!product) { wixLocation.to('/shop'); return; }

        if ($w('#productName').length > 0) $w('#productName').text = product.name || '';
        if ($w('#productDescription').length > 0) $w('#productDescription').text = product.description || '';
        if ($w('#productPrice').length > 0) $w('#productPrice').text = `$${Number(product.price).toFixed(2)}`;
        if ($w('#productImage').length > 0 && product.imageUrl) $w('#productImage').src = product.imageUrl;
        if ($w('#productCategory').length > 0) $w('#productCategory').text = product.category || '';

        if ($w('#addToCartBtn').length > 0) {
            $w('#addToCartBtn').customClassList.remove('hidden');
        }
    } catch (_) {
        if ($w('#errorMsg').length > 0) $w('#errorMsg').show();
    }
}

function initAddToCart() {
    if ($w('#addToCartBtn').length > 0) {
        $w('#addToCartBtn').onClick(() => wixLocation.to('/cart'));
    }
    if ($w('#buyNowBtn').length > 0) {
        $w('#buyNowBtn').onClick(() => wixLocation.to('/checkout'));
    }
}

async function applyAListPricing() {
    try {
        const member = await currentMember.getMember();
        if (!member) return;
        const { discount, isBirthday } = await getActiveDiscount(member.loginEmail, 'consumer');
        if (!discount || !$w('#alistPrice').length) return;
        const base = parseFloat($w('#productPrice').text?.replace('$', '') || '0');
        const sale = (base * (1 - discount / 100)).toFixed(2);
        $w('#alistPrice').text = `A List Price: $${sale}${isBirthday ? ' 🎂' : ''}`;
        $w('#alistPrice').show();
    } catch (_) {}
}
