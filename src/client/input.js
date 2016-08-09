import { KEY_W, KEY_A, KEY_S, KEY_D } from './keys'

const ACTIONS = {
  MOVE_UP: 0,
  MOVE_DOWN: 1,
  MOVE_LEFT: 2,
  MOVE_RIGHT: 3
}

let bindings = {
  [ACTIONS.MOVE_UP]: KEY_W,
  [ACTIONS.MOVE_LEFT]: KEY_A,
  [ACTIONS.MOVE_DOWN]: KEY_S,
  [ACTIONS.MOVE_RIGHT]: KEY_D
}
