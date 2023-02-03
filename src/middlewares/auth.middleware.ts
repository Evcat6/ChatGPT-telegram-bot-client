import * as dotenv from 'dotenv'
import { type NextFunction } from 'grammy'
import { updateStorage } from '../services/session.service'
import { type MyContext } from '../types/context'
// 'CommandMiddleware<Context>'

dotenv.config()

async function authMiddleware (ctx: MyContext, next: NextFunction): Promise<any> {
  if (ctx.session.authorized) {
    void next(); return
  }
  if (ctx.session.authorized && ctx.message.text === process.env.USER_PASSWORD) {
    void ctx.reply('You have already authorized')
    void next(); return
  }
  if (ctx.message.text === process.env.USER_PASSWORD) {
    updateStorage(ctx, 'authorized', true)
    void ctx.reply('Congratulations, you have successfully logged in and now you can use CatGPT')
    return
  }
  if (!ctx.session.authorized) {
    void ctx.reply('Invalid password or you are not authorized')
  }
}

export { authMiddleware }
