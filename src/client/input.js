import { KEY_W, KEY_A, KEY_S, KEY_D } from './keys'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../common/constants/actions'

let down = {}

const keydown = (ev) => {
  let code = ev.keyCode
  down[code] = true
}

const keyup = (ev) => {
  let code = ev.keyCode
  delete down[code]
}

export const bindKeyboard = (target) => {
  target.addEventListener('keydown', keydown)
  target.addEventListener('keyup', keyup)
}

export const isDown = (code) => (
  down[code] === true
)

export let bindings = {
  [MOVE_UP]: KEY_W,
  [MOVE_LEFT]: KEY_A,
  [MOVE_DOWN]: KEY_S,
  [MOVE_RIGHT]: KEY_D
}
