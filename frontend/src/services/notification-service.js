import httpService from './httpService'

export const notificationService = {
    createNotificationSubscription,
    getUserSubscription,
    popNotification,
    isPushNotificationSupported,
    sendSubscriptionToPushServer,
    sendNotification
}

const pushServerPublicKey = "BPocpzl5WFAeE1WFFuZucGpqI1IDnz6Nnm1XgHI9-84omRI5RqzUn2lHWgOyJ6pamI5CondQQj-Xwws9GHoUMKU";


async function createNotificationSubscription() {
    navigator.serviceWorker.ready.then(serviceWorker => {
        serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: pushServerPublicKey
        })
    })
}

function getUserSubscription() {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
        .then(function (serviceWorker) {
            return serviceWorker.pushManager.getSubscription();
        })
        .then(function (pushSubscription) {
            return pushSubscription;
        });
}


async function popNotification(data) {
    const { title, body, icon } = data;
    navigator.serviceWorker.ready.then((serviceWorker) => {
        serviceWorker.showNotification(title, { body, icon });
    });
}

function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

async function sendSubscriptionToPushServer(subscriptionRequest, userId) {
    const response = await httpService.post("notification/subscription", { subscriptionRequest, userId });
}

async function sendNotification(userSubscription, data) {
    await httpService.post(`notification/subscription/${userSubscription}`,data)
};

