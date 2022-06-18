const { startAllNeeded } = require('./utils/StartBuilders')
const express = require("express")
const cors = require('cors')
const url = require('url')
const app = express()
const routes = require('./routes')
const { Server } = require('ws')
const { isAuthorized } = require('./utils/isAuthorized')
const WebSocketController = require('./controllers/WebSocketController')
// const Redis = require('./utils/CacheManager').getInstance()

const initServer = async () => {
  const serverStartedAt = Date.now()
  await startAllNeeded().then(() => console.log('[START] All dependencies started'))
  app.use(cors())
  app.use(express.json())

  const httpServer = app.listen(2080, () => {
    console.log('[SERVER] Menhera Picasso started at port 2080')
  });

  /*
    -- CODIGO PARA TESTAR IMAGENS -- 
    Acessar http://localhost:2080

(() => {
    let btn = document.createElement("button")
    let img = document.createElement("img")
    let line = document.createElement("p")

    img.setAttribute('id', 'image')
    
    btn.innerHTML = "Clica Pra update"
    btn.style.width = '1000px'
    btn.style['font-size'] = '130px' 
    btn.style.height = "300px"
    
    document.body.appendChild(btn)
    document.body.appendChild(line)
    document.body.appendChild(img)
    
    btn.onclick = async () => {

      const res = await fetch('http://localhost:2080/test')
       const data = await res.json()
    const img = document.getElementById("image");

        img.src = 'data:image/png;base64,' + data.data

};
    
})()

const { buildFluffetyImage } = require('./renderers/FluffetyRender')
app.get('/test', async (_, res) => {
  const result = await buildFluffetyImage('hamsin', 'outside', { energy: 25, foody: 50, happy: 80, healthy: 100 })

  res.send({ data: result.toString('base64') })
})
app.get('/test', async (_, res) => {
  const result = await buildFluffetyImage('hamsin', 'outside', { energy: 25, foody: 50, happy: 80, healthy: 100 })

  res.send({ data: result.toString('base64') })
})
  */

  const ws = new Server({ server: httpServer });

  ws.on('connection', (socket, req) => {
    socket.id = url.parse(req.url, true).query.id ?? 'UNKNOWN'
    socket.isAlive = true;
    socket.uptime = Date.now()

    if (isNaN(Number(socket.id))) return socket.close(4400, 'Invalid Client ID')

    console.log(`[CONNECTION] - Connection stablished with Client ID ${socket.id}`)

    socket.on('message', (rawRequest) => WebSocketController(socket, rawRequest));

    socket.on('pong', (ms) => {
      socket.isAlive = true;
      socket.responseTime = Date.now() - ms.toString();
    })

    socket.on('close', (code, reason) => {
      console.log(`[CLOSE] - Client ${socket.id} closed by client-side with code ${code}. ${reason.length > 0 ? `Reason: ${reason.toString()}` : 'No reason especified'}`)
    })
  })

  app.get('/ping', async (_, res) => {
    // const startTime = Date.now();
    // Redis.online ? await Redis.client.ping() : 'OFFLINE'
    // const redisPing = Date.now() - startTime;
    res.status(200).json({
      http: { uptime: Date.now() - serverStartedAt },
      ws: [...ws.clients.values()].map(a => ({ id: Number(a.id), ping: a.responseTime, uptime: Date.now() - a.uptime })),
      // redis: Redis.online ? `${redisPing}ms` : 'OFFLINE'
    })
  })

  setInterval(() => {
    ws.clients.forEach((skt) => {
      if (skt.isAlive === false) {
        console.log(`[CLOSE] - Client ${skt.id} has been terminated by server-side`)
        return skt.terminate()
      }

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
