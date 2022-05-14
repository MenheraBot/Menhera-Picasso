const CanvasImport = require('canvas');
const { getFluffetyExample, getFluffetyIcon } = require('../ImageReader');

const getColorByPercentage = (percentage) => {
  if (percentage >= 85) return '#148a14'
  if (percentage >= 65) return '#94ba0e'
  if (percentage >= 45) return '#d5b93c'
  if (percentage >= 25) return '#ed8d1b'
  if (percentage >= 0) return '#ed1b1b'
}

const getAmountToFill = (percentage, max) => (max * percentage) / 100;

const buildFluffetyImage = async (race, commode, fluffetyStatus) => {
  const canvas = CanvasImport.createCanvas(1024, 1300);
  const ctx = canvas.getContext('2d');

  // Draw the screen with comode
  const commodeImage = await CanvasImport.loadImage(getFluffetyExample(commode))
  ctx.drawImage(commodeImage, 0, 0, canvas.width, canvas.height)

  // Make all the construction of user fluffety
  const fluffety = await CanvasImport.loadImage(getFluffetyExample(race)).catch(er => console.log(er));
  ctx.drawImage(fluffety, 310, 860)

  // Draw status boxes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.fillRect(49, 39, 200, 200)
  //ctx.fillRect(286, 39, 200, 200)
  ctx.fillRect(532, 39, 200, 200)
  //ctx.fillRect(776, 39, 200, 200)


  const energyFill = getAmountToFill(200, fluffetyStatus.energy)
  //const foodyFill = getAmountToFill(200, fluffetyStatus.foody)
  const happyFill = getAmountToFill(200, fluffetyStatus.happy)
  // const healthyFill = getAmountToFill(200, fluffetyStatus.healthy)

  ctx.fillStyle = getColorByPercentage(fluffetyStatus.energy)
  ctx.fillRect(49, 200 - energyFill + 39, 200, energyFill)

  // ctx.fillStyle = getColorByPercentage(fluffetyStatus.foody)
  // ctx.fillRect(286, 200 - foodyFill + 39, 200, foodyFill)

  ctx.fillStyle = getColorByPercentage(fluffetyStatus.happy)
  ctx.fillRect(532, 200 - happyFill + 39, 200, happyFill)

  // ctx.fillStyle = getColorByPercentage(fluffetyStatus.healthy)
  //ctx.fillRect(776, 200 - healthyFill + 36, 200, healthyFill)

  const energyIcon = await CanvasImport.loadImage(getFluffetyIcon('energy'))
  ///const foodIcon = await CanvasImport.loadImage(getFluffetyIcon('food'))
  const happyIcon = await CanvasImport.loadImage(getFluffetyIcon('happy'))
  // const hearthIcon = await CanvasImport.loadImage(getFluffetyIcon('hearth'))

  ctx.drawImage(energyIcon, 100, 60, 100, 100)
  //ctx.drawImage(foodIcon, 340, 60, 100, 100)
  ctx.drawImage(happyIcon, 585, 60, 100, 100)
  // ctx.drawImage(hearthIcon, 830, 60, 100, 100)

  ctx.lineWidth = 10
  ctx.strokeRect(49, 39, 200, 200)
  // ctx.strokeRect(286, 39, 200, 200)
  ctx.strokeRect(532, 39, 200, 200)
  // ctx.strokeRect(776, 39, 200, 200)

  ctx.fillStyle = 'white';
  ctx.font = 'bold 52px Sans';
  ctx.textAlign = 'center';
  ctx.lineWidth = 1

  ctx.fillText(`${fluffetyStatus.energy}%`, 150, 210)
  // ctx.fillText(`${fluffetyStatus.foody}%`, 390, 210)
  ctx.fillText(`${fluffetyStatus.happy}%`, 640, 210)
  //  ctx.fillText(`${fluffetyStatus.healthy}%`, 885, 210)

  ctx.strokeText(`${fluffetyStatus.energy}%`, 150, 210)
  //  ctx.strokeText(`${fluffetyStatus.foody}%`, 390, 210)
  ctx.strokeText(`${fluffetyStatus.happy}%`, 640, 210)
  //ctx.strokeText(`${fluffetyStatus.healthy}%`, 885, 210)


  return canvas.toBuffer();
}

module.exports = { buildFluffetyImage }