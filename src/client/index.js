import connect from './connect'
import { INPUT_STATE } from '../common/constants/network'
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

  if (isDown(bindings[ACTIONS.MOVE_UP])) {
    currentInputState.push(ACTIONS.MOVE_UP)
  }

  if (isDown(bindings[ACTIONS.MOVE_LEFT])) {
    currentInputState.push(ACTIONS.MOVE_LEFT)
  }

  if (isDown(bindings[ACTIONS.MOVE_DOWN])) {
    currentInputState.push(ACTIONS.MOVE_DOWN)
  }

  if (isDown(bindings[ACTIONS.MOVE_RIGHT])) {
    currentInputState.push(ACTIONS.MOVE_RIGHT)
  }

  if (!equal(previousInputState, currentInputState)) {
    socket.emit(INPUT_STATE, currentInputState)
  }

  previousInputState = currentInputState

  // also do it locally
}, pollInterval)