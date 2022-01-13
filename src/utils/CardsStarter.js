const CanvasImport = require('canvas')
const { getCardByID, getBackgroundCard } = require('../ImageReader')

const availableCardThemes = ['default', 'death']
const availableCardbackgrounds = ['red', 'blue', 'cute_menhera', 'premium', 'kawaii']

const colorCodesByTableTheme = {
  green: '#2aa421',
  blue: '#3e86e9',
  red: '#ff383a',
  pink: '#f231b4',
  rounded: '#2aa421',
  gauderios: '#2aa321'
}

const LodadedBackgrounds = {}

const LoadedCardIcons = {
  default: {},
  death: {}
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
module.exports.Colors = colorCodesByTableTheme;
module.exports.Backgrounds = LodadedBackgrounds