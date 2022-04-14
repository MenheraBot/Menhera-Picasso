const canvas = require('./CanvasPrototypes')
const CardsStarter = require('./CardsStarter')
const { registerFont } = require('canvas')
const { join } = require('path')
const { Start: StartBadges } = require('./ProfileUtils')
const { start } = require('../renderers/StatusRender')

const startAllNeeded = async () => {
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'impact.ttf'), { family: 'Impact' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'candy.ttf'), { family: 'Candy' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'arial.ttf'), { family: 'Arial' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'kawaii.ttf'), { family: 'Kawaii' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'warrior.ttf'), { family: 'Warrior' })
  registerFont(join(__dirname, '..', 'assets', 'fonts', 'pixellari.ttf'), { family: 'Pixellari' })
  StartBadges()
  canvas.start()
  CardsStarter.Start()
  await start()
}


module.exports = { startAllNeeded }