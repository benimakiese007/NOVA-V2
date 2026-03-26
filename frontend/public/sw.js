const CACHE_NAME = 'newket-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/pages/catalog.html',
    '/pages/product.html',
    '/pages/cart.html',
    '/pages/favorites.html',
    '/pages/shops.html',
    '/pages/shop.html',
    '/css/style.css',
    '/css/tailwind.css',
    '/js/main.js',
    '/js/supabase-client.js',
    '/js/supabase-adapter.js',
    '/js/auth.js',
    '/js/cart.js',
    '/js/favorites.js',
    '/js/currency.js',
    '/js/products.js',
    '/js/orders.js',
    '/js/managers.js',
    '/js/ui-helpers.js',
    '/js/ui.js',
    '/js/search.js',
    '/js/components-loader.js',
    '/manifest.json',
    '/Images/Logo NewKet V2.jpeg'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching critical assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Only handle http/https and skip Supabase
    if (!event.request.url.startsWith('http') || url.hostname.includes('supabase.co') || url.hostname.includes('iconify.design')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch((err) => {
                console.warn('[Service Worker] Fetch failed:', event.request.url, err);
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/index.html');
                }
                // Return a basic error response instead of throwing to avoid "Failed to convert value to Response"
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            });

            return cachedResponse || fetchPromise;
        })
    );
});
