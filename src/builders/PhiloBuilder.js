const { getPhilo } = require("../ImageReader");
const CanvasImport = require('canvas')

const buildPhiloImage = async (text) => {
  const canvas = CanvasImport.createCanvas(720, 720);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 58px Sans';
  ctx.fillText(ctx.getLines(text, 720).join('\n'), 0, 100);

  const bufferedPhiloImage = await getPhilo()
  const philoImage = await CanvasImport.loadImage(bufferedPhiloImage);
  ctx.drawImage(philoImage, 0, 300, 412, 520);

  return canvas.toBuffer();
}

module.exports = { buildPhiloImage }