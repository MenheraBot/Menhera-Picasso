const profile = require('../renderers/ProfileRender')
const canvas = require('./CanvasPrototypes')
const status = require('../renderers/StatusRender')
const blackjack = require('../renderers/BlackjackRender')
const startAllNeeded = async () => {
  profile.start()
  canvas.start()
  await status.start()
  await blackjack.start()
}

module.exports = { startAllNeeded }