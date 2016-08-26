import io from 'socket.io-client'
import { CHAT, JOIN, LEAVE, BOOT, STATE_UPDATE } from '../../common/constants/network'
import checkLatency from './checkLatency'
import playerStore from '../playerStore'

const connect = (server) => {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on(BOOT, (data) => {
    console.log('boot', data)
    data.players.forEach((player) => {
      playerStore.add(player)
    })
    playerStore.host = playerStore.add(data.player)
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (player) => {
    console.log('join', player)
    playerStore.add(player)
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    playerStore.removeById(id)
  })

  socket.on(STATE_UPDATE, (state) => {
    // console.log('state', state)
    playerStore.updateById(state.id, state)
  })

  setInterval(() => {
    checkLatency(socket)
  }, 2000)

  return socket
}

export default connect
