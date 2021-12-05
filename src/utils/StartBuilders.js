const canvas = require('./CanvasPrototypes')
const CardsStarter = require('./CardsStarter')
const { registerFont } = require('canvas')
const { join } = require('path')
const { Start: StartBadges } = require('./ProfileUtils')

const startAllNeeded = async () => {
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'impact.ttf'), { family: 'Impact' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'candy.ttf'), { family: 'Candy' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'arial.ttf'), { family: 'Arial' })
  StartBadges()
  canvas.start()
  CardsStarter.Start()
}


module.exports = { startAllNeeded }