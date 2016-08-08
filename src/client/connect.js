import SocketIOClient from 'socket.io-client'
import checkLatency from './checkLatency'

const connect = function (server) {
  let connection = server.host + ':' + server.port
  let socket = new SocketIOClient(connection)

  socket.on('chat', (msg) =>
    console.log('chat', msg)
  )

  setInterval(() => {
    checkLatency(socket)
  }, 2000)
}

export default connect
