const express = require('express')
const { bot, webhookCallback } = require('./services/bot.service')
const { authorTgLink } = require('./data/constants/chat')
const { authMiddleware } = require('./middlewares/auth.middleware')
const { clearStorage } = require('./services/session.service')
const { createRequest } = require('./services/request.service')

const greeting = async (ctx) => {
  ctx.reply(`Hello! I'm ChatGPT telegram bot client created by <a href='${authorTgLink}' >Evgen Kotlyarchuck</a>!`, { parse_mode: 'HTML' })
}

const stop = async (ctx) => {
  clearStorage(ctx)
  ctx.reply(`Goodbye ${ctx.message.chat.username})`)
}

const serverRequest = async (ctx) => {
  const resultQuery = await createRequest(ctx.message.text)
  ctx.reply(resultQuery)
}

bot.command('start', greeting)

bot.command('stop', stop)

bot.on('message', authMiddleware, serverRequest)

// Start the server
if (process.env.NODE_ENV === 'production') {
  // Use Webhooks for the production server
  const app = express()
  app.use(express.json())
  app.use(webhookCallback(bot, 'express'))

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`)
  })
} else {
  // Use Long Polling for development
  bot.start()
}
