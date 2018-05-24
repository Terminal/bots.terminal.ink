module.exports = {
  language: 'British English',
  'you-have-x-bots': ({ count }) => {
    if (count === 0) {
      return 'You have no bots'
    } else if (count === 1) {
      return 'You have one bot'
    } else {
      return `You have ${count} bots`
    }
  }
}
