// Vercel Web Analytics Integration
// This module provides Vercel Analytics tracking for the Wix site

// Import the analytics tracking function
// Note: Wix Velo runs in a browser environment, so we use the inject method
let analyticsInitialized = false;

/**
 * Initialize Vercel Web Analytics
 * Call this function once when the site loads (typically in masterPage or home page)
 */
export function initVercelAnalytics() {
    if (analyticsInitialized) {
        return;
    }

    try {
        // Dynamically inject the Vercel Analytics script
        const script = document.createElement('script');
        script.src = 'https://cdn.vercel-insights.com/v1/script.js';
        script.defer = true;
        script.setAttribute('data-sdk-src', '/_vercel/insights/script.js');
        
        // Add script to document head
        document.head.appendChild(script);
        
        analyticsInitialized = true;
        console.log('Vercel Analytics initialized');
    } catch (error) {
        console.error('Failed to initialize Vercel Analytics:', error);
    }
}

/**
 * Track a custom event
 * @param {string} eventName - The name of the event
 * @param {Object} properties - Optional event properties
 */
export function trackEvent(eventName, properties = {}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('track', eventName, properties);
    }
}

/**
 * Track a page view manually (usually handled automatically)
 * @param {string} url - The URL to track
 */
export function trackPageView(url) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('pageview', { url });
    }
}
