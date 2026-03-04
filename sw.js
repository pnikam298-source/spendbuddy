// SpendBuddy Service Worker - minimal, does NOT cache anything
// Firebase handles all offline data caching instead

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Clear ALL old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('Deleting cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// Do NOT intercept any fetch requests - let everything go to network
// This ensures Firebase, app files, and all scripts load fresh every time
