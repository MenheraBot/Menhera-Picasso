const CanvasImport = require('canvas')
const { getCardByID, getBackgroundCard } = require('../ImageReader')

const availableCardThemes = ['default']
const availableCardbackgrounds = ['red']

const colorCodesByTheme = {
  green: '#2aa421',
  blue: '#3e86e9'
}

const LodadedBackgrounds = {}

const LoadedCardIcons = {
  default: {}
}

const Start = () => {
  availableCardThemes.forEach(async theme => {
    for (let i = 52; i > 0; i--) {
      const loaded = await CanvasImport.loadImage(getCardByID(i, theme))
      LoadedCardIcons[theme][i] = loaded;
    }
  })
  availableCardbackgrounds.forEach(async theme => {
    const loaded = await CanvasImport.loadImage(getBackgroundCard(theme))
    LodadedBackgrounds[theme] = loaded;
  })
}

module.exports.Cards = LoadedCardIcons
module.exports.Start = Start
module.exports.Colors = colorCodesByTheme;
module.exports.Backgrounds = LodadedBackgrounds