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
    y: entity.position.y,
    color: entity.color
  }
}

io.on(CONNECT, (socket) => {
  // new connection received
  // authorisation?
  console.log('player connected (total players: ' + (players.length + 1) + ')')

  let player = Entity.create()
  player.inputState = []
  player.socket = socket
  player.color = Math.random() * 0xffffff
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
    player.inputState = state
  })
})

let updateTick = 1000 / 25

let movementAmount = 0.3

setInterval(() => {
  // apply current input state each tick where one exists
  players
    .filter((player) => {
      return player.inputState.length > 0
    })
    .forEach((player) => {
      player.dirty = true
      player.inputState.forEach((action) => {
        switch (action) {
          case MOVE_UP:
            player.position.y += movementAmount
            break
          case MOVE_DOWN:
            player.position.y -= movementAmount
            break
          case MOVE_LEFT:
            player.position.x -= movementAmount
            break
          case MOVE_RIGHT:
            player.position.x += movementAmount
            break
        }
      })
    })

  // go through dirty entities
  // notify nearby players of their new positions
  players
    .filter((entity) => {
      return entity.dirty === true
    })
    .forEach((entity) => {
      let nearBy = getNearbyPlayers(entity, players)
      let updatedState = toNetwork(entity)
      // TODO batch these so clients get multiple in one packet
      nearBy.forEach((nearByPlayer) => {
        nearByPlayer.socket.emit(STATE_UPDATE, updatedState)
      })
      entity.socket.emit(STATE_UPDATE, updatedState)
      // reset dirty flag
      entity.dirty = false
    })
}, updateTick)
