import socketio from 'socket.io'
import webserver from './webserver'
import { CONNECT, DISCONNECT, CHAT, LATENCY, INPUT  } from '../common/constants/network'

let io = socketio(webserver)

io.on(CONNECT, (socket) => {
  console.log('connection established')

  socket.on(DISCONNECT, () => {
    console.log('disconnected')
  })

  socket.on(CHAT, (msg) => {
    io.emit('chat', msg)
  })

  socket.on(LATENCY, (startTime, cb) => {
    cb(startTime)
  })

  socket.on(INPUT, () => {
    // switch inputs like flux actions
  })
})
