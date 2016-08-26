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
let updateTick = 1000 / 25
let currentInputState = []
let previousInputState = []

bindKeyboard(document)

setInterval(() => {
  currentInputState = getInput()
  if (!equal(previousInputState, currentInputState)) {
    socket.emit(INPUT_STATE, currentInputState)
  }
  previousInputState = currentInputState
  applyInput(currentInputState, playerStore.host)
}, updateTick)

function renderLoop () {
  window.requestAnimationFrame(renderLoop)
  render()
}
renderLoop()
