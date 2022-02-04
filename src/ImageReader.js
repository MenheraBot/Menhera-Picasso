const fs = require('fs')

const returnBufferedImage = (image) => fs.readFileSync(`src/assets/images/${image}.png`)
const returnCardsBufferedImage = (image, theme) => fs.readFileSync(`src/assets/cards/${theme}/${image}.png`)
const returnTableBufferedImage = (image) => fs.readFileSync(`src/assets/tables/${image}.png`)
const returnBackgroundCardBufferedImage = (theme) => fs.readFileSync(`src/assets/backgrounds/${theme}.png`)
const returnProfileBufferedImage = (profile) => fs.readFileSync(`src/assets/profiles/${profile}.png`)

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
const getChristmas2021Badge = () => returnBufferedImage('christmas_2021');
const getBot = () => returnBufferedImage('bot')
const getPencil = () => returnBufferedImage('pencil')
const getBeta = () => returnBufferedImage('beta')

const getAp = () => returnBufferedImage('ap');
const getArmor = () => returnBufferedImage('armor');
const getClass = () => returnBufferedImage('class');
const getDamage = () => returnBufferedImage('damage');
const getGem = () => returnBufferedImage('gem');
const getHeart = () => returnBufferedImage('heart');
const getLevel = () => returnBufferedImage('level');
const getMana = () => returnBufferedImage('mana');
const getStatus = () => returnBufferedImage('status');
const getXp = () => returnBufferedImage('xp');

// Profiles
const getChristmasBaseProfile = () => returnProfileBufferedImage('base_christmas')
const getWarriorProfile = () => returnProfileBufferedImage('guerreiro')
const getFortificaçao = () => returnProfileBufferedImage('fortfica')
const getKawaii = () => returnProfileBufferedImage('kawaii')

//  Cards

const getTable = (theme = 'green') => returnTableBufferedImage(theme);
const getBackgroundCard = (theme = 'red') => returnBackgroundCardBufferedImage(theme);
const getCardByID = (cardID, theme = 'default') => returnCardsBufferedImage(cardID, theme);


module.exports = {
  getBadgeOne,
  getBalance,
  getBirthday,
  getBanido,
  getBeta,
  getMenheraDev,
  getBravery,
  getBrilliance,
  getDeveloper,
  getRpg,
  getAstolfo,
  getBot,
  getChristmasBaseProfile,
  getGado,
  getChristmas2021Badge,
  getFortificaçao,
  getPencil,
  getKawaii,
  getBoleham,
  getHundred,
  getPhilo,
  getRing,
  getAp,
  getArmor,
  getClass,
  getDamage,
  getGem,
  getHeart,
  getLevel,
  getMana,
  getVote,
  getStatus,
  getXp,
  getVasco,
  getWarriorProfile,
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
