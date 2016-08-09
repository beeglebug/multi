import connect from './connect'
import { INPUT_STATE } from '../common/constants/network'

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

setInterval(() => {
  let state = []

  if (isDown(bindings[ACTIONS.MOVE_UP])) {
    state.push(ACTIONS.MOVE_UP)
  }

  if (isDown(bindings[ACTIONS.MOVE_LEFT])) {
    state.push(ACTIONS.MOVE_LEFT)
  }

  if (isDown(bindings[ACTIONS.MOVE_DOWN])) {
    state.push(ACTIONS.MOVE_DOWN)
  }

  if (isDown(bindings[ACTIONS.MOVE_RIGHT])) {
    state.push(ACTIONS.MOVE_RIGHT)
  }

  if (state.length) {
    socket.emit(INPUT_STATE, state)
  }

  // also do it locally
}, pollInterval)
