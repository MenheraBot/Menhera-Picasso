const { Router } = require('express')
const controller = require('./controllers/controllers')

const router = Router()

router.get('/astolfo', controller.buildAstolfo)
router.get('/philo', controller.buildPhilo)
router.get('/ship', controller.buildShip)
router.get('/trisal', controller.buildTrisal)
router.get('/status', controller.buildStatus)
router.get('/profile', controller.buildProfile)


module.exports = router;