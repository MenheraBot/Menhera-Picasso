const CanvasImport = require('canvas')
const { getVasco } = require('../ImageReader')

const buildVascoImage = async (user, username, quality, position) => {
  const canvas = CanvasImport.createCanvas(800, 534);
  const ctx = canvas.getContext('2d');

  const vascoBuffered = getVasco(quality);
  const vascoImage = await CanvasImport.loadImage(vascoBuffered).catch(er => console.log(er));

  const userImage = await CanvasImport.loadImage(user);

  ctx.drawImage(userImage, 65, 165, 243, 243);
  ctx.drawImage(vascoImage, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '42px Impact';
  ctx.textAlign = "center"
  ctx.fillText(ctx.getLines(`${username.toUpperCase()}\n${position.toUpperCase()}`, 350).join('\n'), 500, 260);


  return canvas.toBuffer();
}

module.exports = { buildVascoImage }