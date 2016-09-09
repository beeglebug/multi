import io from 'socket.io-client'
import { CHAT, JOIN, LEAVE, HANDSHAKE, STATE_UPDATE } from '../../common/constants/network'
import Entity from '../../common/Entity'
import checkLatency from './checkLatency'

const connect = (server, game) => {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)
  game.latency = 0

  // receive initial data
  socket.on(HANDSHAKE, (data) => {
    console.log('HANDSHAKE', data)
    data.players.forEach((player) => {
      game.entities.add(player)
    })
    game.player = game.entities.add(data.player)
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (data) => {
    let player = Entity.hydrate(data)
    console.log('join', player)
    game.entities.add(player)
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    game.entities.removeById(id)
  })

  // will get an update every tick (50ms)
  socket.on(STATE_UPDATE, (state) => {
    let player = entityStore.byId[state.id]
    player.position.x = state.x
    player.position.y = state.y
  })

  setInterval(() => {
    checkLatency(socket, (ms) => {
      game.latency = ms
    })
  }, 1000)

  return socket
}

export default connect
