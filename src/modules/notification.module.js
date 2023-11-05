import { Module } from '../core/module';
import { randomNumber } from '../utils';
import './styles/notification.css';

const fetchUrl = 'https://jsonplaceholder.typicode.com/comments?id=';

function Notification() {
    this.container = document.createElement('div');
    this.container.classList.add('notification-container');

    this.elements = []
    this.notificationCount = 4;

    this.addItem = function (notification) {
        console.log(this.elements)

        this.elements.push(notification.item);
        notification.prev = this.elements.length - 1 > 0 && this.elements[this.elements.length - this.notificationCount - 1];

        if (this.elements.length > this.notificationCount) {
            animateDisappearing.call(notification.prev)
                .then(() => {
                    try {
                        removeItem(notification.prev);
                        clearTimeout(notification.prev.timeoutID);
                    } catch (err) {
                        console.error(err);
                    }
                })
        }

        this.container.prepend(notification.item);
        animateAppearing.call(notification.item)
            .then(() => {
                setContent.call(notification.item);
            });
        notification.timeoutID = setTimeout(() => {
            animateDisappearing.call(notification.item)
                .then(() => {
                    try {
                        removeItem(notification.item);
                    } catch (err) {
                        console.error(err);
                    }
                })
        }, 5000)
    }

    function removeItem(notification) {
        setTimeout(() => {
            this.container.removeChild(notification);
            this.elements = this.elements.filter(e => e !== notification);
        }, 1000);
    }

    return this;
}

function notificationItem() {
    this.item = document.createElement('div');
    this.item.id = 'i' + (0xffffff * Date.now()).toString(16);
    this.item.classList.add('notification-item');

    const title = document.createElement('h4');
    title.classList.add('title', 'loading');

    const description = document.createElement('p');
    description.classList.add('description', 'loading');

    this.item.append(title, description)

    return this;
}

function getContent() {
    return fetch(fetchUrl + randomNumber(1, 500));
}

function setContent() {
    getContent()
        .then((response) => response.json())
        .then((json) => {
            const title = this.querySelector('.title');
            const description = this.querySelector('.description');
            title.textContent = json[0]?.name;
            title.classList.remove('loading');
            description.textContent = json[0]?.body;
            description.classList.remove('loading');
        })
        .catch((e) => console.error(e));
}

function animateAppearing() {
    return new Promise((res, rej) => {
        res(
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.classList.add('appeared');
                })
            })
        );
    });
}

function animateDisappearing() {
    return new Promise((res, rej) => {
        res(
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.classList.remove('appeared');
                })
            })
        );
    });
}


export class NotificationModule extends Module {
    constructor() {
        super('notification', 'Random message');
        this.notificationContainer = new Notification();
        document.body.prepend(this.notificationContainer.container);
    }
    trigger() {
        const notification = new notificationItem();
        const parent = this.notificationContainer;
        parent.addItem(notification);
    }
}