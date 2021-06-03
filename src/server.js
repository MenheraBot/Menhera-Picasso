require('./utils/CanvasPrototypes').start()
const express = require("express")
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.json())

app.use(routes)

app.use("/", (_req, res) => {
  res.sendStatus(404);
})

app.listen(3000);