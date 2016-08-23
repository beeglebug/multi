import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../../common/constants/actions'
import { bindings } from './bindings'
import { isDown } from './keyboard'

const getState = () => {
  let state = []
  if (isDown(bindings[MOVE_UP])) {
    state.push(MOVE_UP)
  }
  if (isDown(bindings[MOVE_LEFT])) {
    state.push(MOVE_LEFT)
  }
  if (isDown(bindings[MOVE_DOWN])) {
    state.push(MOVE_DOWN)
  }
  if (isDown(bindings[MOVE_RIGHT])) {
    state.push(MOVE_RIGHT)
  }
  return state
}

export default getState