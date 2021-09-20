
const { startAllNeeded } = require('./utils/StartBulders')
const express = require("express")
const cors = require('cors')
const app = express()
const routes = require('./routes')
const { isAuthorized } = require('./utils/isAuthorized')

const initServer = async () => {
  const startTime = Date.now()
  await startAllNeeded().then(() => console.log('[START] All dependencies started'))
  app.use(cors())
  app.use(express.json())

  app.use(routes, isAuthorized)

  app.get('/ping', (_, res) => res.status(200).json({ message: 'Heyyy, im up', uptime: Date.now() - startTime }))

  app.use((_req, res) => {
    res.status(404).json({ message: 'Welp, there is nothing for you right here' });
  })

  app.listen(2080, () => {
    console.log('[SERVER] Menhera Picasso started at port 2080')
  });
}

initServer();
