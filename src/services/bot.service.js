const { Bot, webhookCallback, session } = require('grammy')
const { createInitialSessionData } = require('./session.service')
const { freeStorage } = require('@grammyjs/storage-free')
require('dotenv').config()

const bot = new Bot(process.env.BOT_CLIENT_API_KEY)

bot.use(session({
  initial: createInitialSessionData,
  storage: freeStorage(bot.token)
}))

module.exports = {
  bot,
  webhookCallback
}
