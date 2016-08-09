import express from 'express'
import http from 'http'
import path from 'path'

let app = express()
let webserver = http.Server(app)
let publicDir = path.join(__dirname, '../../dist/client')
let port = 3000

app.use(express.static(publicDir))

webserver.listen(port, () => {
  console.log('web server listening on port ' + port)
})

export default webserver
