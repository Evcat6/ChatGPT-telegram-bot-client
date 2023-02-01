
function createInitialSessionData () {
  return {
    authorized: false
  }
}

function updateStorage (ctx, key, value) {
  ctx.session[key] = value
  return ctx.session[key]
}

module.exports = {
  createInitialSessionData,
  updateStorage
}
