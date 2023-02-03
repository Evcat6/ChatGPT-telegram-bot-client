import { bot, webhookCallback } from './services/bot.service'
import * as express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

// Start the server
if (process.env.NODE_ENV === 'production') {
  // Use Webhooks for the production server
  const app = express()
  app.use(express.json())
  app.use(webhookCallback(bot, 'express'))

  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`)
  })
} else {
  // Use Long Polling for development
  void bot.start()
}
