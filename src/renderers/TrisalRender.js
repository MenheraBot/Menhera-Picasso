const CanvasImport = require('canvas')

const buildTrisalImage = async (userOne, userTwo, userThree) => {
  const ImageOne = await CanvasImport.loadImage(userOne);
  const ImageTwo = await CanvasImport.loadImage(userTwo);
  const ImageThree = await CanvasImport.loadImage(userThree);

  const canvas = CanvasImport.createCanvas(728, 256);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(ImageOne, 0, 0, 256, 256);
  ctx.drawImage(ImageTwo, 256, 0, 256, 256);
  ctx.drawImage(ImageThree, 512, 0, 256, 256);

  return canvas.toBuffer();
}

module.exports = { buildTrisalImage }