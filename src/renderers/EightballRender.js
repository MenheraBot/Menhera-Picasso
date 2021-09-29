const CanvasImport = require('canvas');
const { getBedroom, getTextBox, getMenhera, getReponseBox } = require('../ImageReader');

const build8BallImage = async (question, answer, type, username) => {

  const availableNumebers = {
    positive: 3,
    neutral: 4,
    negative: 5
  }

  const selectedNumber = Math.floor(Math.random() * availableNumebers[type]) + 1;

  const bedroom = await CanvasImport.loadImage(getBedroom())
  const textbox = await CanvasImport.loadImage(getTextBox())
  const responsebox = await CanvasImport.loadImage(getReponseBox())
  const selectedMenhera = await CanvasImport.loadImage(getMenhera(selectedNumber, type))

  const canvas = CanvasImport.createCanvas(854, 456);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(bedroom, 0, 0, 854, 456);
  ctx.drawImage(selectedMenhera, 10, 10, 387, 440);
  ctx.drawImage(textbox, 40, 250, textbox.width, textbox.height);
  ctx.drawImage(responsebox, 440, 20, 400, 250);

  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.font = username.lenght <= 20 ? 'bold 28px Sans' : 'bold 22px Sans';
  ctx.textAlign = 'center'

  ctx.fillText(username, 440, 339, 300);
  ctx.strokeText(username, 440, 339, 300);

  ctx.font = 'bold 38px Sans';

  question = question.endsWith('?') ? question : `${question}?`

  const textLines = ctx.getLines(question, 700)

  if (textLines.length === 1) {
    ctx.fillText(textLines.join('\n'), 440, 400)
    ctx.strokeText(textLines.join('\n'), 440, 400);
  } else {
    ctx.fillText(textLines.join('\n'), 440, 380)
    ctx.strokeText(textLines.join('\n'), 440, 380)
  }

  ctx.fillText(ctx.getLines(answer, 360).join('\n'), 645, 100);
  ctx.strokeText(ctx.getLines(answer, 360).join('\n'), 645, 100);

  return canvas.toBuffer();
}

module.exports = { build8BallImage }