const { Router } = require('express')
const controller = require('./controllers/controllers')

const router = Router()

router.get('/astolfo', controller.renderAstolfo)
router.get('/philo', controller.renderPhilo)
router.get('/ship', controller.renderShip)
router.get('/trisal', controller.renderTrisal)
router.get('/profile', controller.renderProfile)
router.get('/gado', controller.renderGado)
router.get('/macetava', controller.renderMacetava)
router.get('/blackjack', controller.renderBlackjack)
router.get('/8ball', controller.renderEightball)
router.get('/vasco', controller.renderVascoImage)
router.get('preview', controller.renderPreview)

module.exports = router;