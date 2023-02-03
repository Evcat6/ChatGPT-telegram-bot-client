import { authorTgLink } from '../data/constants/chat'
import { clearStorage, getItemFromStorage } from '../services/session.service'
import { createRequest } from '../services/request.service'
import { type MyContext } from '../types/context'

const greeting = async (ctx: MyContext): Promise<void> => {
  void ctx.reply(`Hello! I'm ChatGPT telegram bot client created by <a href='${authorTgLink}' >Evgen Kotlyarchuck</a>!`, { parse_mode: 'HTML' })
}

const stop = async (ctx: MyContext): Promise<void> => {
  clearStorage(ctx)
  void ctx.reply(`Goodbye ${ctx.message.chat.username})`)
}

const serverRequest = async (ctx: MyContext): Promise<void> => {
  const resultQuery = await createRequest(ctx.message.text)
  void ctx.reply(resultQuery ?? '')
}

const checkAuth = async (ctx: MyContext): Promise<void> => {
  const auth = getItemFromStorage(ctx, 'authorized')
  if (auth === true) {
    void ctx.reply('You are authorized)')
  } else {
    void ctx.reply('You are not authorized)')
  }
}

export {
  greeting,
  stop,
  serverRequest,
  checkAuth
}
