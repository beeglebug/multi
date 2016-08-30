const checkLatency = (socket, callback) => {
  socket.emit('latency', +Date.now(), (startTime) => {
    var latency = +Date.now() - startTime
    callback(latency)
  })
}

export default checkLatency
