const { buildAstolfoImage } = require("../renderers/AstolfoRender")
const { buildGadoImage } = require("../renderers/GadoRender")
const { buildPhiloImage } = require("../renderers/PhiloRender")
const { buildProfileImage } = require("../renderers/ProfileRender")
const { buildShipImage } = require("../renderers/ShipRender")
const { buildStatusImage } = require("../renderers/StatusRender")
const { buildTrisalImage } = require("../renderers/TrisalRender")


const renderAstolfo = async (req, res) => {
  const result = await buildAstolfoImage(req.body.text)
  res.send(result.toJSON())
}

const renderPhilo = async (req, res) => {
  const result = await buildPhiloImage(req.body.text)
  res.send(result.toJSON())
}

const renderTrisal = async (req, res) => {
  const { userOne, userTwo, userThree } = req.body
  const result = await buildTrisalImage(userOne, userTwo, userThree)
  res.send(result.toJSON())
}

const renderShip = async (req, res) => {
  const { linkOne, linkTwo, shipValue } = req.body
  const result = await buildShipImage(linkOne, linkTwo, shipValue)
  res.send(result.toJSON())
}

const renderStatus = async (req, res) => {
  const { user, userAvatarLink, i18n } = req.body
  const result = await buildStatusImage(user, userAvatarLink, i18n)
  res.send(result.toJSON())
}

const renderProfile = async (req, res) => {
  const { user, marry, usageCommands, i18n } = req.body
  const result = await buildProfileImage(user, marry, usageCommands, i18n)
  res.send(result.toJSON())
}

const renderGado = async (req, res) => {
  const { image } = req.body
  const result = await buildGadoImage(image);
  res.send(result.toJSON())
}


module.exports = {
  renderAstolfo,
  renderPhilo,
  renderTrisal,
  renderShip,
  renderStatus,
  renderProfile,
  renderGado
}