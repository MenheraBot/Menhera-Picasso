const CanvasImport = require('canvas');
const { getBedroom } = require('../ImageReader');

const build8BallImage = async (question, type) => {

  const canvas = CanvasImport.createCanvas(1280, 700);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(getBedroom(), 0, 0, 1280, 700);
  ctx.fillStyle = '#000'
  ctx.fillText(question, 10, 0)
  ctx.fillText(type, 500, 300)

  return canvas.toBuffer();
}

module.exports = { build8BallImage }