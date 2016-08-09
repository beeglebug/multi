import socketio from 'socket.io'
import webserver from './webserver'
import { CONNECT, DISCONNECT, CHAT, LATENCY, INPUT_STATE } from '../common/constants/network'

let io = socketio(webserver)

console.log('server started')

io.on(CONNECT, (socket) => {

  // new connection received
  // authorisation?
  console.log('connection established')

  // send initial data
  socket.emit('boot', {
    map: {}
  })

  // catch disconnections
  socket.on(DISCONNECT, () => {
    console.log('disconnected')
  })

  // chat messages
  socket.on(CHAT, (msg) => {
    io.emit('chat', msg)
  })

  // return latency information
  socket.on(LATENCY, (startTime, cb) => {
    cb(startTime)
  })

  socket.on(INPUT_STATE, (state) => {
    console.log('input state: ', state)
  })
})
