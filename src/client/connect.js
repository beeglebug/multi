import io from 'socket.io-client'
import checkLatency from './checkLatency'
import { CHAT, JOIN, LEAVE, BOOT } from '../common/constants/network'

let playersById = {}

window.playersById = playersById

const connect = function (server) {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on(BOOT, (data) => {
    console.log('boot', data)
    data.players.forEach((player) => {
      playersById[player.id] = player
    })
    playersById[data.player.id] = data.player
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (player) => {
    console.log('join', player)
    playersById[ player.id ] = player
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    delete playersById[id]
  })

  setInterval(() => {
    checkLatency(socket)
  }, 2000)

  return socket
}

export default connect
