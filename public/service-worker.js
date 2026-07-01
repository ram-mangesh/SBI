// ============================================================================
// Service Worker — Phase 1 Placeholder
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §18
// Full implementation in Communication feature phase (Section 10.6).
// Responsibilities:
//   1. Register FCM (Firebase Cloud Messaging)
//   2. Handle push event → show OS notification
//   3. Handle notificationclick → deep link routing
//   4. Cache static assets for offline support (stale-while-revalidate)
// ============================================================================

const CACHE_NAME = 'bankmate-v1';
const STATIC_ASSETS = [];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first for API calls, cache-first for static assets
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && STATIC_ASSETS.length > 0) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});

// Push notification handler (Phase 2 — Communication feature)
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  if (!data) return;

  event.waitUntil(
    self.registration.showNotification(data.title || 'BankMate AI', {
      body: data.body || '',
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      data: data.data || {},
      actions: data.actions || [],
    })
  );
});

// Notification click → deep link
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const deepLink = event.notification.data?.deepLink;
  if (deepLink) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        const client = clients.find((c) => c.url.includes('bankmate'));
        if (client) {
          client.navigate(deepLink);
          client.focus();
        } else {
          self.clients.openWindow(deepLink);
        }
      })
    );
  }
});
