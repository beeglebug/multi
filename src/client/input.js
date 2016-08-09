import { KEY_W, KEY_A, KEY_S, KEY_D } from './keys'

let down = {}

const keydown = (ev) => {
  let code = ev.keyCode
  down[code] = true
}

const keyup = (ev) => {
  let code = ev.keyCode
  delete down[code]
}

export const ACTIONS = {
  MOVE_UP: 0,
  MOVE_DOWN: 1,
  MOVE_LEFT: 2,
  MOVE_RIGHT: 3
}

export const bindKeyboard = (target) => {
  target.addEventListener('keydown', keydown)
  target.addEventListener('keyup', keyup)
}

export const isDown = (code) => (
  down[code] === true
)

export let bindings = {
  [ACTIONS.MOVE_UP]: KEY_W,
  [ACTIONS.MOVE_LEFT]: KEY_A,
  [ACTIONS.MOVE_DOWN]: KEY_S,
  [ACTIONS.MOVE_RIGHT]: KEY_D
}
