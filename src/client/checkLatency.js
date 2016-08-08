const checkLatency = function (socket) {
  socket.emit('latency', +Date.now(), (startTime) => {
    var latency = +Date.now() - startTime
    console.log('ping: ' + latency + 'ms')
  })
}

export default checkLatency
