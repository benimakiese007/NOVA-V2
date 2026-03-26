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
            console.log('[Service Worker] Caching all assets');
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

// Fetch Event (Stale-while-revalidate strategy)
self.addEventListener('fetch', (event) => {
    // Skip Supabase API calls or external resources if needed
    if (event.request.url.includes('supabase.co')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response then update in background
                if (event.request.url.startsWith('http')) {
                    fetch(event.request).then((networkResponse) => {
                        if (networkResponse && networkResponse.ok) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                    }).catch(err => {
                        console.warn('[Service Worker] Background fetch failed for:', event.request.url, err);
                    });
                }
                return cachedResponse;
            }

            if (!event.request.url.startsWith('http')) return fetch(event.request);

            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            }).catch((err) => {
                console.error('[Service Worker] Fetch failed:', event.request.url, err);
                // Offline fallback for HTML pages
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/index.html');
                }
                throw err;
            });
        })
    );
});
