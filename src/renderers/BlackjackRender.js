const CanvasImport = require('canvas')
const { getTable, getHidden, getCardByID } = require('../ImageReader')

const LoadedIcons = {}

const start = async () => {
  const table = getTable()
  const hidden = getHidden()
  LoadedIcons.table = await CanvasImport.loadImage(table).catch(er => console.log(er));
  LoadedIcons.hidden = await CanvasImport.loadImage(hidden).catch(er => console.log(er));

  for (let i = 52; i > 0; i--) {
    const loaded = await CanvasImport.loadImage(getCardByID(i)).catch(er => console.log(er));
    LoadedIcons[i] = loaded;
  }
}

const buildBlackjackImage = async (userCards, menheraCards, userTotal, menheraTotal, i18n, aposta) => {
  const canvas = CanvasImport.createCanvas(630, 370);
  const ctx = canvas.getContext('2d');

  const talbeImage = await CanvasImport.loadImage(getTable()).catch(er => console.log(er));

  ctx.drawImage(talbeImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Sans';
  ctx.fillText(`${i18n.yourHand}\n     ${userTotal}`, 20, 300)
  ctx.strokeText(`${i18n.yourHand}\n     ${userTotal}`, 20, 300)

  ctx.fillText(`${i18n.dealerHand}\n        ${menheraTotal}`, 20, 25)
  ctx.strokeText(`${i18n.dealerHand}\n        ${menheraTotal}`, 20, 25)

  ctx.fillStyle = 'yellow'
  ctx.fillText(`JackPot\n${aposta * 2}`, 220, 190)
  ctx.strokeText(`JackPot\n${aposta * 2}`, 220, 190)

  let number = 0;
  userCards.forEach(card => {
    number++;
    ctx.drawImage(LoadedIcons[card.id], 80 + (80 * number), 260, 72, 84)
  })

  number = 0;

  menheraCards.forEach(card => {
    number++;
    ctx.drawImage((card?.hidden ? LoadedIcons['hidden'] : LoadedIcons[card.id]), 100 + (80 * number), 40, 72, 84)
  })

  return canvas.toBuffer();
}

module.exports = { buildBlackjackImage, start }