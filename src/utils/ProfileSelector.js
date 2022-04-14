const { christmasProfileImage } = require("../renderers/profiles/ChristmasRenderer")
const { buildProfileImage } = require("../renderers/profiles/DefaultRender")
const { fortificaçãoProfileImage } = require("../renderers/profiles/FortificaçãoRenderer")
const { guerreiroProfileImage } = require("../renderers/profiles/GuerreiroRenderer")
const { kawaiiProfileImage } = require("../renderers/profiles/KawaiiRenderer")
const { upsideDownProfile } = require("../renderers/profiles/UpsideDownRenderer")
const { iD03ProfileImage } = require('../renderers/profiles/Id03Renderer')
const { withoutSoulProfileImage } = require('../renderers/profiles/WithoutSoulRenderer')

module.exports = (user, marry, usageCommands, i18n, type) => {
  switch (type) {
    case 'kawaii':
      return kawaiiProfileImage(user, marry, usageCommands, i18n)
    case 'fortification':
      return fortificaçãoProfileImage(user, marry, usageCommands, i18n)
    case 'warrior':
      return guerreiroProfileImage(user, marry, usageCommands, i18n)
    case 'christmas_2021':
      return christmasProfileImage(user, marry, usageCommands, i18n)
    case 'upsidedown':
      return upsideDownProfile(user, marry, usageCommands, i18n)
    case 'default':
      return buildProfileImage(user, marry, usageCommands, i18n)
    case 'id03':
      return iD03ProfileImage(user, marry, usageCommands, i18n)
    case 'without_soul':
      return withoutSoulProfileImage(user, marry, usageCommands, i18n)
    default:
      return buildProfileImage(user, marry, usageCommands, i18n)
  }
}