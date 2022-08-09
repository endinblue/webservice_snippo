// importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
//
//
//
// firebase.initializeApp({
//     'messagingSenderId': '146013192443'
// });
//
// const messaging = firebase.messaging();
//
//
//
// messaging.setBackgroundMessageHandler(payload => {
//     const title = payload.notification.title;
//     console.log('payload', payload.notification.icon);
//     const options = {
//         body: payload.notification.body,
//         icon: payload.notification.icon
//     }
//     return self.registration.showNotification(title, options);
// });
//
// self.addEventListener("notificationclick", function(event) {
//     const clickedNotification = event.notification;
//     clickedNotification.close();
//     const promiseChain = clients
//         .matchAll({
//             type: "window",
//             includeUncontrolled: true
//         })
//         .then(windowClients => {
//             console.log("메세지 애드 리스너")
//             let matchingClient = null;
//             for (let i = 0; i < windowClients.length; i++) {
//                 const windowClient = windowClients[i];
//                 if (windowClient.url === feClickAction) {
//                     matchingClient = windowClient;
//                     break;
//                 }
//             }
//             if (matchingClient) {
//                 return matchingClient.focus();
//             } else {
//                 return clients.openWindow(feClickAction);
//             }
//         });
//     event.waitUntil(promiseChain);
// });