import Vec2 from '../common/math/Vec2'

// quick temp id
let id = 0

export default class Entity {
  constructor () {
    this.id = ++id
    this.position = new Vec2()
  }
}
