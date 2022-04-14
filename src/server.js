const { startAllNeeded } = require('./utils/StartBuilders')
const express = require("express")
const cors = require('cors')
const url = require('url')
const app = express()
const routes = require('./routes')
const { Server } = require('ws')
const { isAuthorized } = require('./utils/isAuthorized')
const WebSocketController = require('./controllers/WebSocketController')

const initServer = async () => {
  const startTime = Date.now()
  await startAllNeeded().then(() => console.log('[START] All dependencies started'))
  app.use(cors())
  app.use(express.json())

  const httpServer = app.listen(2080, () => {
    console.log('[SERVER] Menhera Picasso started at port 2080')
  });

  const ws = new Server({ server: httpServer });

  ws.on('connection', (socket, req) => {
    socket.id = url.parse(req.url, true).query.id ?? 'UNKNOWN'
    socket.isAlive = true;
    socket.uptime = Date.now()

    console.log(`[CONNECTION] - Connection stablished with ID ${socket.id}`)

    socket.on('message', (rawRequest) => WebSocketController(socket, rawRequest));

    socket.on('pong', (ms) => {
      socket.isAlive = true;
      socket.responseTime = Date.now() - ms.toString();
    })
  })

  app.get('/ping', (_, res) => {
    res.status(200).json({ http: { uptime: Date.now() - startTime }, ws: [...ws.clients.values()].map(a => ({ id: Number(a.id), ping: a.responseTime, uptime: Date.now() - a.uptime })) })
  })

  setInterval(() => {
    ws.clients.forEach((skt) => {
      if (skt.isAlive === false) return skt.terminate()

      skt.isAlive = false;
      skt.ping(Date.now())
    })
  }, 15000)

  app.use(routes, isAuthorized)

  app.use((_req, res) => {
    res.status(404).json({ message: 'Welp, there is nothing for you right here' });
  })
}

initServer();
