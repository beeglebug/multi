import io from 'socket.io-client'
import checkLatency from './checkLatency'

const connect = function (server) {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on('boot', (data) =>
    console.log('boot', data)
  )

  // chat message received
  socket.on('chat', (msg) =>
    console.log('chat', msg)
  )

  setInterval(() => {
    checkLatency(socket)
  }, 2000)
}

export default connect
