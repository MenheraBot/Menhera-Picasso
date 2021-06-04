
const { startAllNeeded } = require('./utils/StartBulders')
const express = require("express")
const cors = require('cors')
const app = express()
const routes = require('./routes')

const initServer = async () => {
  await startAllNeeded()
  app.use(cors())
  app.use(express.json())

  app.use(routes)

  app.use("/", (_req, res) => {
    res.sendStatus(404);
  })

  app.listen(2080);
}

initServer();
