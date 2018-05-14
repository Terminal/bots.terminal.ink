const languages = {
  'en': require('./en') // Secretly British
}

const get = (language, text, extras) => {
  const defaultReply = language + '+' + text

  if (!languages[language]) return defaultReply
  if (!languages[language][text]) return defaultReply
  if (typeof languages[language][text] === 'string') return languages[language][text]
  if (typeof languages[language][text] === 'function') return languages[language][text]()
  return defaultReply
}

module.exports = {
  get
}
