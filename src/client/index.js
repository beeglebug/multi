import { INPUT_STATE } from '../common/constants/network'
import io from 'socket.io-client'
import checkLatency from './checkLatency'
import { CHAT, JOIN, LEAVE, BOOT, STATE_UPDATE } from '../common/constants/network'
import Entity from '../common/Entity'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../common/constants/actions'
import equal from 'array-equal'
import THREE from 'three'

// get this from some kind of server list
let server = {
  name: 'test server',
  host: '127.0.0.1',
  port: 3000
}

let players = []
let playersById = {}

window.playersById = playersById

function makePlayer (data) {
  var player = Entity.hydrate(data)
  player.renderable = makeCube(player.position)
  return player
}

function makeCube (position) {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  var material = new THREE.MeshBasicMaterial({ color: 0x999999 })
  var cube = new THREE.Mesh(geometry, material)
  cube.position.set(position.x, position.y, 0)
  return cube
}

function addPlayer (data) {
  let player = makePlayer(data)
  scene.add(player.renderable)
  players.push(player)
  playersById[player.id] = player
}

function removePlayer (id) {
  let targetPlayer = playersById[id]
  players = players.filter((player) => {
    return targetPlayer !== player
  })
  delete playersById[id]
}

const connect = function (server) {
  let connection = server.host + ':' + server.port
  let socket = io.connect(connection)

  // receive initial data
  socket.on(BOOT, (data) => {
    console.log('boot', data)
    data.players.forEach((player) => {
      addPlayer(player)
    })
    addPlayer(data.player)
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
    console.log('state', state)
    let player = playersById[state.id]
    if (player) {
      player.position.x = state.x
      player.position.y = state.y
    }
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

let interval = 1000 / 25

var currentInputState = []
var previousInputState = []

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

  // also do it locally
}, interval)

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// scene.add(cube)
scene.background = new THREE.Color(0xDDDDDD)
camera.position.z = 10
renderer.render(scene, camera)
