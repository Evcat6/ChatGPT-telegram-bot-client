
function createInitialSessionData () {
  return {
    authorized: false
  }
}

function updateStorage (ctx, key, value) {
  ctx.session[key] = value
  return ctx.session[key]
}

function getItemFromStorage (ctx, key) {
  return ctx.session[key]
}

function clearStorage (ctx) {
  ctx.session = createInitialSessionData()
}

module.exports = {
  createInitialSessionData,
  updateStorage,
  clearStorage,
  getItemFromStorage
}
