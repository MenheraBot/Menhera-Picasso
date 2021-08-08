const CanvasImport = require('canvas')

const RainbowColorPercentage = (percentage) => {
  const canvas = CanvasImport.createCanvas(456, 75);
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.00, 'red');
  gradient.addColorStop(1 / 6, 'orange');
  gradient.addColorStop(2 / 6, 'yellow');
  gradient.addColorStop(3 / 6, 'green');
  gradient.addColorStop(4 / 6, 'aqua');
  gradient.addColorStop(5 / 6, 'blue');
  gradient.addColorStop(1.00, 'purple');

  context.fillStyle = gradient;
  context.lineWidth = 20;

  const howMuchToFill = percentage / 100;
  // Rainbow ship
  context.roundRect(0, 0, canvas.width * howMuchToFill, canvas.height, 40, true, false);

  // BlackBox
  context.roundRect(0, 0, canvas.width, canvas.height, 40, false, true);

  return canvas.toDataURL();
}

const buildShipImage = async (linkOne, linkTwo, shipValue) => {
  const canvas = CanvasImport.createCanvas(512, 350);
  const ctx = canvas.getContext('2d');

  const avatarOneLoaded = await CanvasImport.loadImage(linkOne).catch(er => console.log(er));
  const avatarTwoLoaded = await CanvasImport.loadImage(linkTwo).catch(er => console.log(er));
  const shipLoadedImage = await CanvasImport.loadImage(RainbowColorPercentage(shipValue)).catch(er => console.log(er));

  ctx.fillStyle = '#fff';

  ctx.drawImage(avatarOneLoaded, 0, 0, 256, 256);
  ctx.drawImage(avatarTwoLoaded, 256, 0, 256, 256);
  ctx.drawImage(shipLoadedImage, 20, 270, 456, 75);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 58px Sans';
  ctx.fillText(`${shipValue}%`, 256, 330);
  ctx.strokeText(`${shipValue}%`, 256, 330);

  return canvas.toBuffer();
}

module.exports = { buildShipImage }