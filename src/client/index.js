import io from 'socket.io-client'
import checkLatency from './checkLatency'
import { CHAT, JOIN, LEAVE, BOOT, STATE_UPDATE, INPUT_STATE } from '../common/constants/network'
import Entity from '../common/Entity'
import equal from 'array-equal'
import { bindKeyboard } from './input/keyboard'
import makeCube from './renderer/makeCube'
import getServer from './getServer'
import getState from './input/getState'
import applyInput from './input/applyInput'
import { camera, scene, renderer } from './renderer/scene'
import cameraFollow from './renderer/cameraFollow'

function makePlayer (data) {
  let player = Entity.hydrate(data)
  player.renderable = makeCube(player.position, player.color)
  return player
}

function addPlayer (data) {
  let player = makePlayer(data)
  scene.add(player.renderable)
  players.push(player)
  playersById[player.id] = player
  return player
}

function removePlayer (id) {
  let targetPlayer = playersById[id]
  players = players.filter((player) => {
    return targetPlayer !== player
  })
  scene.remove(targetPlayer.renderable)
  delete playersById[id]
}

function updatePlayer (state) {
  let player = playersById[state.id]
  if (player) {
    player.position.x = state.x
    player.position.y = state.y
  }
}

const connect = (server) => {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on(BOOT, (data) => {
    console.log('boot', data)
    data.players.forEach((player) => {
      addPlayer(player)
    })
    window.currentPlayer = currentPlayer = addPlayer(data.player)
  })

  // chat message received
  socket.on(CHAT, (msg) =>
    console.log('chat', msg)
  )

  socket.on(JOIN, (player) => {
    console.log('join', player)
    addPlayer(player)
  })

  socket.on(LEAVE, (id) => {
    console.log('leave', id)
    removePlayer(id)
  })

  socket.on(STATE_UPDATE, (state) => {
    // console.log('state', state)
    updatePlayer(state)
  })

  setInterval(() => {
    checkLatency(socket)
  }, 2000)

  return socket
}

function render () {
  window.requestAnimationFrame(render)
  players.forEach((player) => {
    player.renderable.position.x = player.position.x
    player.renderable.position.y = player.position.y
  })
  cameraFollow(currentPlayer, camera)
  renderer.render(scene, camera)
}

let server = getServer()
let socket = connect(server)
let players = []
let playersById = {}
let currentPlayer = null
let tick = 1000 / 25
let moveTick = 1000 / 10
let currentInputState = []
let previousInputState = []

bindKeyboard(document)

window.playersById = playersById

setInterval(() => {
  currentInputState = getState()
  if (!equal(previousInputState, currentInputState)) {
    socket.emit(INPUT_STATE, currentInputState)
  }
  previousInputState = currentInputState
}, tick)

setInterval(() => {
  if (currentPlayer) {
    applyInput(currentInputState, currentPlayer)
  }
}, moveTick)

render()
