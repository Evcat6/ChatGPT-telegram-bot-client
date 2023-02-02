const { clearStorage, getItemFromStorage } = require('../services/session.service')
const { createRequest } = require('../services/request.service')
const { authorTgLink } = require('../data/constants/chat')

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

const checkAuth = async (ctx) => {
  console.log('dghet')
  const auth = getItemFromStorage(ctx, 'authorized')
  console.log(auth)
  if (auth) {
    ctx.reply('You are authorized)')
  } else {
    ctx.reply('You are not authorized)')
  }
}

module.exports = {
  greeting,
  stop,
  serverRequest,
  checkAuth
}
