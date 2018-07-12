let subscriptions = {
  'loginUser': [],
  'notification': [],
  'notificationHide': []
}

export default {
  events: {
    loginUser: 'loginUser',
    notification: 'notification',
    notificationHide: 'notificationHide'
  },
  subscribe: (eventName, fn) => subscriptions[eventName].push(fn),
  trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data)),
  triggerNoArgs: (eventName) => subscriptions[eventName].forEach(fn => fn())
}
