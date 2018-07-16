let subscriptions = {
  'loginUser': [],
  'notification': [],
  'notificationHide': [],
  'loggedOut': []
}

export default {
  events: {
    loginUser: 'loginUser',
    notification: 'notification',
    notificationHide: 'notificationHide',
    loggedOut: 'loggedOut'
  },
  subscribe: (eventName, fn) => subscriptions[eventName].push(fn),
  trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data)),
  triggerNoArgs: (eventName) => subscriptions[eventName].forEach(fn => fn())
}
