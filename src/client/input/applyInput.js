import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from '../../common/constants/actions'

const applyInput = (state, entity) => {
  let value = 0.3
  state.forEach((action) => {
    switch (action) {
      case MOVE_UP:
        entity.position.y += value
        break
      case MOVE_DOWN:
        entity.position.y -= value
        break
      case MOVE_LEFT:
        entity.position.x -= value
        break
      case MOVE_RIGHT:
        entity.position.x += value
        break
    }
  })
}

export default applyInput
