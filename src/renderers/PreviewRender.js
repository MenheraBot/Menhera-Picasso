const CanvasImport = require('canvas')
const { getTable } = require('../ImageReader');
const { Cards, Backgrounds } = require('../utils/CardsStarter');

const buildPreviewImage = async (type, theme) => {
  let canvas;

  switch (type) {
    case 'table': {
      canvas = CanvasImport.createCanvas(630, 460)
      const ctx = canvas.getContext('2d');

      const talbeImage = await CanvasImport.loadImage(getTable(theme))
      ctx.drawImage(talbeImage, 0, 0, canvas.width, canvas.height)
      break;
    }
    case 'cards': {
      canvas = CanvasImport.createCanvas(408, 187)
      const ctx = canvas.getContext('2d');

      ctx.drawImage(Cards[theme][13], 0, 0, 136, 187)
      ctx.drawImage(Cards[theme][22], 137, 0, 136, 187)
      ctx.drawImage(Cards[theme][47], 137 + 136, 0, 136, 187)
      break;
    }
    case 'card_background': {
      canvas = CanvasImport.createCanvas(156, 242)
      const ctx = canvas.getContext('2d');

      ctx.drawImage(Backgrounds[theme], 0, 0, canvas.width, canvas.height)
      break;
    }
  }

  return canvas.toBuffer()
}

module.exports = { buildPreviewImage }