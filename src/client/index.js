import connect from './connect'
import { INPUT_STATE } from '../common/constants/network'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../common/constants/actions'
import equal from 'array-equal'

// get this from some kind of server list
let server = {
  name: 'test server',
  host: '127.0.0.1',
  port: 3000
}

// do this based on user input
let socket = connect(server)

import { isDown, bindKeyboard, bindings, ACTIONS } from './input'

bindKeyboard(document)

let pollInterval = 1000 / 25

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
}, pollInterval)