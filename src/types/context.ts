import { type Context } from 'grammy'

type MyContext = Context & {
  session: {
    authorized: boolean
  }
  message: {
    text: string
    chat: {
      username: string
    }
  }
}

export type { MyContext }
