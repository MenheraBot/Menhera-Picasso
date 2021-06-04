const profile = require('../builders/ProfileBuilder')
const canvas = require('./CanvasPrototypes')
const status = require('../builders/StatusBuilder')
const startAllNeeded = async () => {
  await profile.start()
  await canvas.start()
  await status.start()
}

module.exports = { startAllNeeded }