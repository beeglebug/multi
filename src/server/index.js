import SocketIO from 'socket.io'
import webserver from './webserver'
import { CONNECT, DISCONNECT, CHAT, LATENCY } from '../common/constants/network'

let io = new SocketIO(webserver)

io.on(CONNECT, (socket) => {
  console.log('user connected')

  socket.on(DISCONNECT, () => {
    console.log('user disconnected')
  })

  socket.on(CHAT, (msg) => {
    io.emit('chat', msg)
  })

  socket.on(LATENCY, (startTime, cb) => {
    cb(startTime)
  })
})
