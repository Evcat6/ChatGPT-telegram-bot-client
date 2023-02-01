require('dotenv').config()

async function authMiddleware (ctx, next) {
  if (ctx.message.text === process.enc.USER_PASSWORD) {
    await next()
  }
  ctx.reply('Invalid password')
}

async function checkAuthMiddleware (ctx, next) {
  if (ctx.session.authorized) {
    return await next()
  }
  ctx.reply('You are not authorized Please enter a password:')
}

module.exports = {
  authMiddleware,
  checkAuthMiddleware
}
