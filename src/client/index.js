import { INPUT_STATE } from '../common/constants/network'
import { bindKeyboard } from './input/keyboard'
import getServer from './network/getServer'
import getInput from './input/get'
import applyInput from './input/apply'
import { render } from './renderer/scene'
import connect from './network/connect'
import game from './game'

let server = getServer()
let socket = connect(server, game)
let tickRate = 20
let inputState = []

bindKeyboard(document)

setInterval(() => {
  inputState = getInput()
  socket.emit(INPUT_STATE, inputState)
  // client side input prediction
  applyInput(inputState, game.player)
}, 1000 / tickRate)

function renderLoop () {
  window.requestAnimationFrame(renderLoop)
  render([], null)
}

renderLoop()
