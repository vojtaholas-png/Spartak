// firebase-messaging-sw.js
// Service Worker pro push notifikace — TJ Spartak VOTOČEK Čelákovice

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_BagFO5mf-qDwBVrVbxULXBD9tv0cjVQ",
  authDomain: "spartak-nohejbal.firebaseapp.com",
  projectId: "spartak-nohejbal",
  storageBucket: "spartak-nohejbal.firebasestorage.app",
  messagingSenderId: "252334492142",
  appId: "1:252334492142:web:71180fbbb65737be34e6ff"
});

const messaging = firebase.messaging();

// Zobrazí notifikaci když je app na pozadí
messaging.onBackgroundMessage(function(payload) {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'TJ Spartak', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  });
});

// Klik na notifikaci otevře stránku
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var c of list) {
        if (c.url.includes('spartak') || c.url.includes('fanousci')) {
          return c.focus();
        }
      }
      return clients.openWindow('https://vojtaholas-png.github.io/Spartak/fanousci.html');
    })
  );
});
