const { updateStorage } = require('../services/session.service')
require('dotenv').config()

async function authMiddleware (ctx, next) {
  if (ctx.session.authorized) {
    return await next()
  }
  if (ctx.session.authorized && ctx.message.text === process.env.USER_PASSWORD) {
    ctx.reply('You have already authorized')
    return await next()
  }
  if (ctx.message.text === process.env.USER_PASSWORD) {
    updateStorage(ctx, 'authorized', true)
    return ctx.reply('Congratulations, you have successfully logged in and now you can use CatGPT')
  }
  ctx.reply('Invalid password or you are not authorized')
}

module.exports = {
  authMiddleware
}
