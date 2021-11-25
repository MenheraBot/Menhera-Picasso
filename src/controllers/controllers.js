const { buildAstolfoImage } = require("../renderers/AstolfoRender")
const { buildGadoImage } = require("../renderers/GadoRender")
const { buildPhiloImage } = require("../renderers/PhiloRender")
const { buildShipImage } = require("../renderers/ShipRender")
const { buildTrisalImage } = require("../renderers/TrisalRender")
const { buildMacetavaImage } = require('../renderers/MacetavaRender')
const { buildBlackjackImage } = require('../renderers/BlackjackRender')
const { build8BallImage } = require("../renderers/EightballRender")
const { buildVascoImage } = require('../renderers/VascoRender')
const ProfileSelector = require("../utils/ProfileSelector")


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

const renderProfile = async (req, res) => {
  const { user, marry, usageCommands, i18n, type } = req.body
  const result = await ProfileSelector(user, marry, usageCommands, i18n, type)
  res.send(result.toJSON())
}

const renderGado = async (req, res) => {
  const { image } = req.body
  const result = await buildGadoImage(image);
  res.send(result.toJSON())
}

const renderMacetava = async (req, res) => {
  const { image, authorName, authorDiscriminator, authorImage } = req.body
  const result = await buildMacetavaImage(image, authorName, authorDiscriminator, authorImage);
  res.send(result.toJSON())
}

const renderBlackjack = async (req, res) => {
  const { userCards, menheraCards, userTotal, menheraTotal, i18n, aposta, cardTheme, tableTheme } = req.body
  const result = await buildBlackjackImage(userCards, menheraCards, userTotal, menheraTotal, i18n, aposta, cardTheme, tableTheme);
  res.send(result.toJSON())
}

const renderEightball = async (req, res) => {
  const { question, type, username, answer } = req.body
  const result = await build8BallImage(question, answer, type, username);
  res.send(result.toJSON())
}

const renderVascoImage = async (req, res) => {
  const { user, username, quality, position } = req.body
  const result = await buildVascoImage(user, username, quality, position)
  res.send(result.toJSON())
}


module.exports = {
  renderAstolfo,
  renderPhilo,
  renderTrisal,
  renderShip,
  renderVascoImage,
  renderProfile,
  renderGado,
  renderMacetava,
  renderBlackjack,
  renderEightball,
}