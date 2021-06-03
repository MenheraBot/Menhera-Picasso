const { rsvgVersion } = require("canvas")
const { buildAstolfoImage } = require("../builders/AstolfoBuilder")
const { buildPhiloImage } = require("../builders/PhiloBuilder")
const { buildProfileImage } = require("../builders/ProfileBuilder")
const { buildShipImage } = require("../builders/ShipBuilder")
const { buildStatusImage } = require("../builders/StatusBuilder")
const { buildTrisalImage } = require("../builders/TrisalBuilder")


const buildAstolfo = async (req, res) => {
  const result = await buildAstolfoImage(req.body.text)
  res.send(result.toJSON())
}

const buildPhilo = async (req, res) => {
  const result = await buildPhiloImage(req.body.text)
  res.send(result.toJSON())
}

const buildTrisal = async (req, res) => {
  const { userOne, userTwo, userThree } = req.body
  const result = await buildTrisalImage(userOne, userTwo, userThree)
  res.send(result.toJSON())
}

const buildShip = async (req, res) => {
  const { linkOne, linkTwo, shipValue } = req.body
  const result = await buildShipImage(linkOne, linkTwo, shipValue)
  res.send(result.toJSON())
}

const buildStatus = async (req, res) => {
  const { user, userAvatarLink, i18n } = req.body
  const result = await buildStatusImage(user, userAvatarLink, i18n)
  res.send(result.toJSON())
}

const buildProfile = async (req, res) => {
  const { user, usageCommands, i18n } = req.body
  const result = await buildProfileImage(user, usageCommands, i18n)
  res.send(result.toJSON())
}


module.exports = {
  buildAstolfo,
  buildPhilo,
  buildTrisal,
  buildShip,
  buildStatus,
  buildProfile
}