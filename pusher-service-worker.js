importScripts('https://js.pusher.com/beams/service-worker.js')

const beamsClient = new PusherPushNotifications.Client({
  instanceId: 'f90d76b2-9fc6-42cf-ab0c-4ebdf0371b85'
})

self.addEventListener('push', event => {
  const payload = event.data ? event.data.json() : {}

  const title = payload.notification.title || 'Push Notification'
  const options = {
    body: payload.notification.body || '',
    icon: payload.notification.icon || '/icon.png'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  // Add custom handling for notification click event, if needed
})

beamsClient.start()
