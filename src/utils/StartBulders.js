const profile = require('../renderers/ProfileRender')
const canvas = require('./CanvasPrototypes')
const blackjack = require('../renderers/BlackjackRender')
const startAllNeeded = async () => {
  profile.start()
  canvas.start()
  await blackjack.start()
}

module.exports = { startAllNeeded }