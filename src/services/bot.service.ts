import { Bot, webhookCallback, session } from 'grammy'
import { type MyContext } from '../types/context'
import { createInitialSessionData } from './session.service'
import { freeStorage } from '@grammyjs/storage-free'
import * as dotenv from 'dotenv'
import { router } from '../router/routes'
import { authMiddleware } from '../middlewares/auth.middleware'
import { greeting, stop, serverRequest, checkAuth } from '../controllers/bot.controller'
import { commands } from '../data/constants/commands'

dotenv.config()

const bot = new Bot<MyContext>(process.env.BOT_CLIENT_API_KEY ?? '')

bot.use(session({
  initial: createInitialSessionData,
  storage: freeStorage(bot.token)
}))

bot.command(commands.start, greeting)

bot.command(commands.stop, stop)

bot.command(commands.check_auth, checkAuth)

bot.on('message', authMiddleware, serverRequest)

bot.use(router)

export {
  bot,
  webhookCallback
}
