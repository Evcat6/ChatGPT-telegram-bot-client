import { Router } from '@grammyjs/router'

const router = new Router((ctx: any) => ctx)

router.otherwise((ctx) => ctx.reply('Unknown command'))

export { router }
