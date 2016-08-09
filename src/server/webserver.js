import express from 'express'
import http from 'http'
import path from 'path'

let app = express()
let server = http.Server(app)
let publicDir = path.join(__dirname, '../../dist/client')
let port = 3000

app.use(express.static(publicDir))

server.listen(port, () => {
  console.log('web server listening on port ' + port)
})

export default server
