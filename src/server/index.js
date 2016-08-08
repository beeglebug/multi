import SocketIO from 'socket.io'
import webserver from './webserver'

let io = new SocketIO(webserver)

var network = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CHAT: 'chat',
  LATENCY: 'latency'
}

io.on(network.CONNECTION, (socket) => {
  console.log('user connected')

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
