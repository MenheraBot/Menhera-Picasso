const fs = require('fs/promises')

const returnBuferedImage = async (image) => {
  return fs.readFile(`src/images/${image}.png`)
}

const getAp = async () => returnBuferedImage('ap');
const getArmor = async () => returnBuferedImage('armor');
const getAstolfo = async () => returnBuferedImage('astolfo');
const getBadgeOne = async () => returnBuferedImage('badge1');
const getBalance = async () => returnBuferedImage('balance');
const getBanido = async () => returnBuferedImage('banido');
const getBirthday = async () => returnBuferedImage('birthday');
const getBravery = async () => returnBuferedImage('bravery');
const getBrilliance = async () => returnBuferedImage('brilliance');
const getClass = async () => returnBuferedImage('class');
const getDamage = async () => returnBuferedImage('damage');
const getDeveloper = async () => returnBuferedImage('developer');
const getGado = async () => returnBuferedImage('gado')
const getGem = async () => returnBuferedImage('gem');
const getHeart = async () => returnBuferedImage('heart');
const getHundred = async () => returnBuferedImage('hundred');
const getJob = async () => returnBuferedImage('job');
const getLevel = async () => returnBuferedImage('level');
const getMana = async () => returnBuferedImage('mana');
const getMenheraDev = async () => returnBuferedImage('menheradev');
const getPhilo = async () => returnBuferedImage('philo');
const getRing = async () => returnBuferedImage('ring');
const getStatus = async () => returnBuferedImage('status');
const getVote = async () => returnBuferedImage('vote');
const getXp = async () => returnBuferedImage('xp');

const yellowFilter = async () => returnBuferedImage('filter');

module.exports = {
  getAp,
  getBadgeOne,
  getBalance,
  getBirthday,
  getBanido,
  getMenheraDev,
  getBravery,
  getBrilliance,
  getDeveloper,
  getArmor,
  getAstolfo,
  getClass,
  getGado,
  getDamage,
  getGem,
  getHeart,
  getHundred,
  getJob,
  getLevel,
  getMana,
  yellowFilter,
  getPhilo,
  getRing,
  getVote,
  getStatus,
  getXp,
}