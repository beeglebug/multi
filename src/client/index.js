import { INPUT_STATE } from '../common/constants/network'
import equal from 'array-equal'
import { bindKeyboard } from './input/keyboard'
import getServer from './network/getServer'
import getInput from './input/get'
import applyInput from './input/apply'
import { render } from './renderer/scene'
import playerStore from './playerStore'
import connect from './network/connect'

let server = getServer()
let socket = connect(server)
let tickRate = 20
let currentInputState = []
let previousInputState = []

bindKeyboard(document)

setInterval(() => {
  currentInputState = getInput()
  if (!equal(previousInputState, currentInputState)) {
    socket.emit(INPUT_STATE, currentInputState)
  }
  previousInputState = currentInputState
  // client side input prediction
  applyInput(currentInputState, playerStore.host)
}, 1000 / tickRate)

function renderLoop () {
  window.requestAnimationFrame(renderLoop)
  render([], null)
}
renderLoop()
