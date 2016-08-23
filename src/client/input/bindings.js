import { KEY_W, KEY_A, KEY_S, KEY_D } from './keys'
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../../common/constants/actions'

export let bindings = {
  [MOVE_UP]: KEY_W,
  [MOVE_LEFT]: KEY_A,
  [MOVE_DOWN]: KEY_S,
  [MOVE_RIGHT]: KEY_D
}
