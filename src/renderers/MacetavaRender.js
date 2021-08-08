const { getMacetava } = require("../ImageReader");
const CanvasImport = require('canvas')

const buildMacetavaImage = async (image, authorName, authorDiscriminator, authorImage) => {
  const canvas = CanvasImport.createCanvas(1080, 882);
  const ctx = canvas.getContext('2d');


  const bufferedMacetavaImage = getMacetava()
  const userImageLoaded = await CanvasImport.loadImage(image).catch(er => console.log(er));
  const macetavaImage = await CanvasImport.loadImage(bufferedMacetavaImage).catch(er => console.log(er));
  const userAvatar = await CanvasImport.loadImage(authorImage).catch(er => console.log(er));

  ctx.drawImage(userAvatar, 30, 18, 145, 145);

  ctx.drawImage(userImageLoaded, 33, 305, 502, 573)
  
  ctx.save();
  ctx.fillStyle = '#FFF';
  ctx.fillRect(542, 305, 505, 573);
  ctx.globalCompositeOperation = 'luminosity';
  ctx.drawImage(userImageLoaded, 542, 305, 505, 573);
  ctx.restore();

  ctx.drawImage(macetavaImage, 0, 0, 1080, 882);

  ctx.fillStyle = 'white'
  ctx.font = '38px Bold Arial'
  ctx.fillText(authorName, 210, 85, 550)
  ctx.font = '38px Arial'
  ctx.fillStyle = '#86878C'
  ctx.fillText(`${authorName}#${authorDiscriminator}`, 250, 145, 550)
  return canvas.toBuffer();
}

module.exports = { buildMacetavaImage }