import { type MyContext } from '../types/context'
import { type Session } from '../interfaces/session'

function createInitialSessionData (): Session {
  return {
    authorized: false
  }
}

function updateStorage (ctx: MyContext, key: string, value: any): any {
  ctx.session[key] = value
  return ctx.session[key]
}

function getItemFromStorage (ctx: MyContext, key: string): any {
  return ctx.session[key]
}

function clearStorage (ctx: MyContext): void {
  ctx.session = createInitialSessionData()
}

export {
  createInitialSessionData,
  updateStorage,
  clearStorage,
  getItemFromStorage
}
