const express = require('express')
const { bot, webhookCallback } = require('./services/bot.service')
const { authMiddleware } = require('./middlewares/auth.middleware')
const { greeting, stop, serverRequest } = require('./controllers/bot.controller')

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
