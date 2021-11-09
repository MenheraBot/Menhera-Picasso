const profile = require('../renderers/ProfileRender')
const canvas = require('./CanvasPrototypes')
const blackjack = require('../renderers/BlackjackRender')
const { registerFont } = require('canvas')
const { join } = require('node:path')
const startAllNeeded = async () => {
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'impact.ttf'), { family: 'Impact' })
  profile.start()
  canvas.start()
  await blackjack.start()
}

module.exports = { startAllNeeded }