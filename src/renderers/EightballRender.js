const CanvasImport = require('canvas');
const { getBedroom } = require('../ImageReader');

const build8BallImage = async (question, type) => {

  const bedroom = await CanvasImport.loadImage(getBedroom())

  const canvas = CanvasImport.createCanvas(1280, 700);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(bedroom, 0, 0, 1280, 700);
  ctx.fillStyle = '#000'
  ctx.font = 'bold 58px Sans';
  ctx.fillText(question, 100, 100)
  ctx.fillText(type, 500, 300)

  return canvas.toBuffer();
}

module.exports = { build8BallImage }