import SocketIOClient from 'socket.io-client'

let socket = new SocketIOClient()

console.log('start', socket);

socket.on('chat', (msg) =>
  console.log('chat', msg)
)

setInterval(() => {
  socket.emit('latency', +Date.now(), (startTime) => {
    var latency = +Date.now() - startTime
    console.log('ping: ' + latency + 'ms')
  })
}, 2000)
