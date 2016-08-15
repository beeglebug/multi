import socketio from 'socket.io'
import webserver from './webserver'
import { CONNECT, DISCONNECT, CHAT, LATENCY, INPUT_STATE, JOIN, LEAVE, BOOT, STATE_UPDATE } from '../common/constants/network'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../common/constants/actions'
import Entity from '../common/Entity'

let io = socketio(webserver)

console.log('server started')

let players = []
let playersBySocketId = {}
let playersById = {}

const getNearbyPlayers = (player, players) => {
  return players.filter((otherPlayer) => {
    return otherPlayer !== player
  })
}

const toNetwork = (entity) => {
  return {
    id: entity.id,
    x: entity.position.x,
    y: entity.position.y
  }
}

io.on(CONNECT, (socket) => {

  // new connection received
  // authorisation?
  console.log('player connected (total players: ' + (players.length + 1) + ')')

  let player = Entity.create()
  player.socket = socket
  playersBySocketId[socket.id] = player
  playersById[player.id] = player
  players.push(player)

  let near = getNearbyPlayers(player, players)

  // send initial data
  socket.emit(BOOT, {
    player: toNetwork(player),
    players: near.map((player) => {
      return toNetwork(player)
    })
  })

  near.forEach((nearByPlayer) => {
    nearByPlayer.socket.emit(JOIN, toNetwork(player))
  })

  // catch disconnections
  socket.on(DISCONNECT, () => {
    console.log('player disconnected (total players: ' + (players.length - 1) + ')')
    let near = getNearbyPlayers(player, players)
    delete playersBySocketId[socket.id]
    delete playersById[player.id]
    players = players.filter((otherPlayer) => {
      return otherPlayer !== player
    })
    near.forEach((nearByPlayer) => {
      nearByPlayer.socket.emit(LEAVE, player.id)
    })
  })

  // chat messages
  socket.on(CHAT, (msg) => {
    io.emit('chat', msg)
  })

  // return latency information
  socket.on(LATENCY, (startTime, cb) => {
    cb(startTime)
  })

  socket.on(INPUT_STATE, (state) => {
    state.forEach((action) => {
      switch (action) {
        case MOVE_UP:
          player.position.y -= 1
          break
        case MOVE_DOWN:
          player.position.y += 1
          break
        case MOVE_LEFT:
          player.position.X -= 1
          break
        case MOVE_RIGHT:
          player.position.x += 1
          break
      }
    })
    // TODO only emit if the new state is different to the old one
    let nearBy = getNearbyPlayers(player, players)
    let updatedState = toNetwork(player)
    console.log('input state update:', state, 'emitting to', nearBy.length, 'players')
    nearBy.forEach((nearByPlayer) => {
      nearByPlayer.socket.emit(STATE_UPDATE, updatedState)
    })
  })
})
