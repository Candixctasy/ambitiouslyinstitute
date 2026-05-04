import wixLocation from 'wix-location';
import { getByBoBoProducts } from 'backend/database.web';

$w.onReady(async function () {
    const category = wixLocation.query?.category || null;
    await loadProducts(category);
    initFilters();
});

async function loadProducts(category) {
    try {
        const { products } = await getByBoBoProducts(category);
        if (!products?.length) {
            if ($w('#noProducts').length > 0) $w('#noProducts').show();
            return;
        }
        if ($w('#productsRepeater').length > 0) {
            $w('#productsRepeater').data = products;
            $w('#productsRepeater').onItemReady(($item, itemData) => {
                if ($item('#productTitle').length > 0) $item('#productTitle').text = itemData.name || '';
                if ($item('#productPrice').length > 0) $item('#productPrice').text = `$${Number(itemData.price || 0).toFixed(2)}`;
                if ($item('#productImg').length > 0 && itemData.imageUrl) $item('#productImg').src = itemData.imageUrl;
                if ($item('#viewBtn').length > 0) {
                    $item('#viewBtn').onClick(() => wixLocation.to(`/product-page/${itemData.productId}`));
                }
            });
        }
    } catch (_) {
        if ($w('#errorMsg').length > 0) $w('#errorMsg').show();
    }
}

function initFilters() {
    const categoryMap = {
        '#filterAll': null,
        '#filterSerum': 'serum',
        '#filterMoisturiser': 'moisturiser',
        '#filterToner': 'toner',
        '#filterCleanser': 'cleanser',
        '#filterTreatment': 'treatment',
    };
    Object.entries(categoryMap).forEach(([selector, cat]) => {
        if ($w(selector).length > 0) {
            $w(selector).onClick(() => loadProducts(cat));
        }
    });
}
