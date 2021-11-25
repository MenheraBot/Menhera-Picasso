const CanvasImport = require('canvas')
const { getHidden, getCardByID } = require('../ImageReader')

const availableCardThemes = ['default']

const colorCodesByTheme = {
  green: '#2aa421',
  blue: '#3e86e9'
}

const LoadedCardIcons = {
  default: {}
}

const Start = () => {
  availableCardThemes.forEach(async theme => {
    const hidden = getHidden(theme)

    LoadedCardIcons[theme]['hidden'] = await CanvasImport.loadImage(hidden)

    for (let i = 52; i > 0; i--) {
      const loaded = await CanvasImport.loadImage(getCardByID(i, theme))
      LoadedCardIcons[theme][i] = loaded;
    }
  })
}

module.exports.Cards = LoadedCardIcons
module.exports.Start = Start
module.exports.Colors = colorCodesByTheme;