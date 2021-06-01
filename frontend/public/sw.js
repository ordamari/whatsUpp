function receivePushNotification(event) {
    const data = event.data.json();
    self.clients.matchAll().then(windowClient => {
        const isAppOpen = !!windowClient.find(window => {
            
            return window.url.includes('whatsupp-react.herokuapp') && window.visibilityState === 'visible'
        });
        if (!isAppOpen) self.registration.showNotification(data.push.title, data.push.info)
    })
}

function openPushNotification(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);



