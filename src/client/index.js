import connect from './connect'

// get this from some kind of server list
let server = {
  name: 'test server',
  host: '127.0.0.1',
  port: 3000
}

// do this based on user input
connect(server)
