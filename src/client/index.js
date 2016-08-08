import SocketIOClient from 'socket.io-client'
import checkLatency from 'checkLatency'

let host = '127.0.0.1'
let port = 3000

connect(host, port)

function connect (host, port) {
  let connection = host + ':' + port
  let socket = new SocketIOClient(connection)

  socket.on('chat', (msg) =>
    console.log('chat', msg)
  )

  setInterval(() => {
    checkLatency(socket)
  }, 2000)
}
