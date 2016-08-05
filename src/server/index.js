import path from 'path'
import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

let app = express()
let server = http.Server(app)
let io = new SocketIO(server)
let port = process.env.PORT || 3000;
let publicDir = path.join(__dirname, '../../dist/client')


app.use(express.static(publicDir))
console.log(publicDir);
var network = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CHAT: 'chat',
  LATENCY: 'latency'
}

io.on(network.CONNECTION, (socket) => {
  console.log('a user connected')

  socket.on(network.DISCONNECT, () => {
    console.log('user disconnected')
  })

  socket.on(network.CHAT, (msg) => {
    io.emit('chat', msg)
  })

  socket.on(network.LATENCY, (startTime, cb) => {
    cb(startTime)
  })
})

server.listen(port, () => {
  console.log('[INFO] Listening on *:' + port)
})
