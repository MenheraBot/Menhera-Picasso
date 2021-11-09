const fs = require('fs')

const returnBuferedImage = (image) => {
  return fs.readFileSync(`src/assets/images/${image}.png`)
}

const returnCardsBufferedImage = (image) => {
  return fs.readFileSync(`src/assets/cards/${image}.png`)
}

// Default

const getAstolfo = () => returnBuferedImage('astolfo');
const getBadgeOne = () => returnBuferedImage('badge1');
const getBalance = () => returnBuferedImage('balance');
const getBedroom = () => returnBuferedImage('bedroom');
const getBanido = () => returnBuferedImage('banido');
const getBirthday = () => returnBuferedImage('birthday');
const getBravery = () => returnBuferedImage('bravery');
const getBrilliance = () => returnBuferedImage('brilliance');
const getDeveloper = () => returnBuferedImage('developer');
const getBoleham = () => returnBuferedImage('boleham');
const getHalloween = () => returnBuferedImage('halloween');
const getHundred = () => returnBuferedImage('hundred');
const getRpg = () => returnBuferedImage('rpg');
const getMenheraDev = () => returnBuferedImage('menheradev');
const getPhilo = () => returnBuferedImage('philo');
const getRing = () => returnBuferedImage('ring');
const getVote = () => returnBuferedImage('vote');
const getGado = () => returnBuferedImage('gado');
const getMacetava = () => returnBuferedImage('macetava');
const getMenhera = (number, type) => returnBuferedImage(`${type}_${number}`);
const getTextBox = () => returnBuferedImage('text_box');
const getReponseBox = () => returnBuferedImage('response_box');
const getVasco = (quality) => returnBuferedImage(`vasco_${quality}`);


//  Cards

const getTable = () => returnCardsBufferedImage('table');
const getHidden = () => returnCardsBufferedImage('hidden');
const getCardByID = (cardID) => returnCardsBufferedImage(cardID);


module.exports = {
  getBadgeOne,
  getBalance,
  getBirthday,
  getBanido,
  getMenheraDev,
  getBravery,
  getBrilliance,
  getDeveloper,
  getRpg,
  getAstolfo,
  getGado,
  getBoleham,
  getHundred,
  getPhilo,
  getRing,
  getVote,
  getVasco,
  getMacetava,
  getTable,
  getCardByID,
  getMenhera,
  getBedroom,
  getTextBox,
  getReponseBox,
  getHalloween,
  getHidden,
}
