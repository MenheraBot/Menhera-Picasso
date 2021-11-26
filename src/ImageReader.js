const fs = require('fs')

const returnBufferedImage = (image) => fs.readFileSync(`src/assets/images/${image}.png`)
const returnCardsBufferedImage = (image, theme) => fs.readFileSync(`src/assets/cards/${theme}/${image}.png`)
const returnTableBufferedImage = (image) => fs.readFileSync(`src/assets/tables/${image}.png`)
const returnBackgroundCardBufferedImage = (theme) => fs.readFileSync(`src/assets/backgrounds/${theme}.png`)

// Default

const getAstolfo = () => returnBufferedImage('astolfo');
const getBadgeOne = () => returnBufferedImage('badge1');
const getBalance = () => returnBufferedImage('balance');
const getBedroom = () => returnBufferedImage('bedroom');
const getBanido = () => returnBufferedImage('banido');
const getBirthday = () => returnBufferedImage('birthday');
const getBravery = () => returnBufferedImage('bravery');
const getBrilliance = () => returnBufferedImage('brilliance');
const getDeveloper = () => returnBufferedImage('developer');
const getBoleham = () => returnBufferedImage('boleham');
const getHalloween = () => returnBufferedImage('halloween');
const getHundred = () => returnBufferedImage('hundred');
const getRpg = () => returnBufferedImage('rpg');
const getMenheraDev = () => returnBufferedImage('menheradev');
const getPhilo = () => returnBufferedImage('philo');
const getRing = () => returnBufferedImage('ring');
const getVote = () => returnBufferedImage('vote');
const getGado = () => returnBufferedImage('gado');
const getMacetava = () => returnBufferedImage('macetava');
const getMenhera = (number, type) => returnBufferedImage(`${type}_${number}`);
const getTextBox = () => returnBufferedImage('text_box');
const getReponseBox = () => returnBufferedImage('response_box');
const getVasco = (quality) => returnBufferedImage(`vasco_${quality}`);
const getMoneyBag = () => returnBufferedImage('moneybag');

//  Cards

const getTable = (theme = 'green') => returnTableBufferedImage(theme);
const getBackgroundCard = (theme = 'red') => returnBackgroundCardBufferedImage(theme);
const getCardByID = (cardID, theme = 'default') => returnCardsBufferedImage(cardID, theme);


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
  getMoneyBag,
  getHalloween,
  getBackgroundCard,
}
