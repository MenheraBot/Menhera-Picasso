const CanvasImport = require('canvas')
const { getAstolfo } = require('../ImageReader')

const buildAstolfoImage = async (txt) => {
  const canvas = CanvasImport.createCanvas(253, 330);
  const ctx = canvas.getContext('2d');

  const astolfoRealImage = await getAstolfo();
  const astolfoImage = await CanvasImport.loadImage(astolfoRealImage);

  ctx.drawImage(astolfoImage, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 20px Sans';
  ctx.fillText(ctx.getLines(txt, 160).join('\n'), 72, 208);

  return canvas.toBuffer();
}

module.exports = { buildAstolfoImage }