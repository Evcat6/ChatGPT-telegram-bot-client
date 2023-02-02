const { Router } = require('@grammyjs/router')

const router = new Router(ctx => {})

router.otherwise((ctx) => ctx.reply('Unknown command'))

module.exports = {
  router
}
