const languages = {
  'en': require('./en') // Secretly British
}

const get = (language, text, extras) => {
  const defaultReply = language + '+' + text

  if (!languages[language]) return defaultReply
  if (!languages[language][text]) return defaultReply
  if (typeof languages[language][text] !== 'function') return defaultReply

  return languages[language][text](extras) || defaultReply
}

module.exports = {
  get
}
