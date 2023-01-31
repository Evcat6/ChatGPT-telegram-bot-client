const { Bot, webhookCallback } = require('grammy')
require('dotenv').config()

const bot = new Bot(process.env.BOT_CLIENT_API_KEY)

module.exports = {
  bot,
  webhookCallback
}
