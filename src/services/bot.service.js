const { Bot, webhookCallback, session } = require('grammy')
const { createInitialSessionData } = require('./session.service')
const { freeStorage } = require('@grammyjs/storage-free')
const { router } = require('../router/routes')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { greeting, stop, serverRequest, checkAuth } = require('../controllers/bot.controller')
const { commands } = require('../data/constants/commands')
require('dotenv').config()

const bot = new Bot(process.env.BOT_CLIENT_API_KEY)

bot.use(session({
  initial: createInitialSessionData,
  storage: freeStorage(bot.token)
}))

bot.command(commands.start, greeting)

bot.command(commands.stop, stop)

bot.command(commands.check_auth, checkAuth)

bot.on(commands.message, authMiddleware, serverRequest)

bot.use(router)

module.exports = {
  bot,
  webhookCallback
}
