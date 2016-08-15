import io from 'socket.io-client'
import checkLatency from './checkLatency'
import { CHAT, JOIN, LEAVE, BOOT, STATE_UPDATE } from '../common/constants/network'
import Entity from '../common/Entity'

let playersById = {}

window.playersById = playersById

const connect = function (server) {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on(BOOT, (data) => {
    console.log('boot', data)
    data.players.forEach((player) => {
      playersById[player.id] = Entity.hydrate(player)
    })
    playersById[data.player.id] = Entity.hydrate(data.player)
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (player) => {
    console.log('join', player)
    playersById[ player.id ] = Entity.hydrate(player)
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    delete playersById[id]
  })

  socket.on(STATE_UPDATE, (state) => {
    console.log('state', state)
    let player = playersById[state.id]
    if (player) {
      player.position.x = state.x
      player.position.y = state.y
    }
  })

  setInterval(() => {
    checkLatency(socket)
  }, 2000)

  return socket
}

export default connect
