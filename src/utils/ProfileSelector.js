const { buildProfileImage } = require("../renderers/profiles/DefaultRender")
const { upsideDownProfile } = require("../renderers/profiles/UpsideDownRenderer")

module.exports = (user, marry, usageCommands, i18n, type) => {
  switch (type) {
    case 'upsidedown':
      return upsideDownProfile(user, marry, usageCommands, i18n)
    case 'default':
      return buildProfileImage(user, marry, usageCommands, i18n)
    default:
      return buildProfileImage(user, marry, usageCommands, i18n)
  }
}