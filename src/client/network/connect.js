import io from 'socket.io-client'
import { CHAT, JOIN, LEAVE, HANDSHAKE, STATE_UPDATE } from '../../common/constants/network'
import checkLatency from './checkLatency'
import entityStore from '../entityStore'

const connect = (server, game) => {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)
  game.latency = 0

  // receive initial data
  socket.on(HANDSHAKE, (data) => {
    console.log('HANDSHAKE', data)
    data.players.forEach((player) => {
      entityStore.add(player)
    })
    game.player = entityStore.add(data.player)
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (player) => {
    console.log('join', player)
    entityStore.add(player)
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    entityStore.removeById(id)
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
