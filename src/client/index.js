import io from 'socket.io-client'
import checkLatency from './checkLatency'
import { CHAT, JOIN, LEAVE, BOOT, STATE_UPDATE, INPUT_STATE } from '../common/constants/network'
import Entity from '../common/Entity'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../common/constants/actions'
import equal from 'array-equal'
import THREE from 'three'
import makeCube from './renderer/makeCube'

// get this from some kind of server list
let server = {
  name: 'test server',
  host: window.location.hostname,
  port: 3000
}

let players = []
let playersById = {}
let currentPlayer = null

window.playersById = playersById

function makePlayer (data) {
  let player = Entity.hydrate(data)
  player.renderable = makeCube(player.position)
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
    player.renderable.position.x = player.position.x
    player.renderable.position.y = player.position.y
    if (player === currentPlayer) {
      cameraFollow(player)
    }
  }
}

function cameraFollow (entity) {
  camera.position.x = entity.position.x
  camera.position.y = entity.position.y - 3
  camera.position.z = 10
  camera.lookAt(entity.position)
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

// do this on some kind of player input
let socket = connect(server);

import { isDown, bindKeyboard, bindings } from './input'

bindKeyboard(document)

let tick = 1000 / 25

let currentInputState = []
let previousInputState = []

setInterval(() => {
  currentInputState = []
  if (isDown(bindings[MOVE_UP])) {
    currentInputState.push(MOVE_UP)
  }
  if (isDown(bindings[MOVE_LEFT])) {
    currentInputState.push(MOVE_LEFT)
  }
  if (isDown(bindings[MOVE_DOWN])) {
    currentInputState.push(MOVE_DOWN)
  }
  if (isDown(bindings[MOVE_RIGHT])) {
    currentInputState.push(MOVE_RIGHT)
  }
  if (!equal(previousInputState, currentInputState)) {
    socket.emit(INPUT_STATE, currentInputState)
  }
  previousInputState = currentInputState
}, tick)

// also do it locally


let moveTick = 1000 / 10
let movementAmount = 0.3

setInterval(() => {
  if (!currentPlayer) {
    return
  }
  currentInputState.forEach((action) => {
    switch (action) {
      case MOVE_UP:
        currentPlayer.position.y += movementAmount
        break
      case MOVE_DOWN:
        currentPlayer.position.y -= movementAmount
        break
      case MOVE_LEFT:
        currentPlayer.position.x -= movementAmount
        break
      case MOVE_RIGHT:
        currentPlayer.position.x += movementAmount
        break
    }
  })
  currentPlayer.renderable.position.x = currentPlayer.position.x
  currentPlayer.renderable.position.y = currentPlayer.position.y
  cameraFollow(currentPlayer)
}, moveTick)





let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
let axisHelper = new THREE.AxisHelper(5)
scene.add(axisHelper)

let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
light.color.setHSL(0.6, 1, 0.6)
light.groundColor.setHSL(0.095, 1, 0.75)
light.position.set(0, 500, 0)
scene.add(light)

scene.background = new THREE.Color(0xDDDDDD)
camera.position.z = 10
camera.position.y = 3
camera.lookAt(new THREE.Vector3(0, 0, 0))

function render () {
  window.requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()
