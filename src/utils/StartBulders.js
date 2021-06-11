const profile = require('../renderers/ProfileRender')
const canvas = require('./CanvasPrototypes')
const status = require('../renderers/StatusRender')
const startAllNeeded = async () => {
  await profile.start()
  await canvas.start()
  await status.start()
}

module.exports = { startAllNeeded }