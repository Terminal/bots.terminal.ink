const environment = process.env.NODE_ENV || 'development'

module.exports = require(`./${environment}.json`) // eslint-disable-line
// This episode of LinusTechTips was brought to you by `eslint-disable-line`!
