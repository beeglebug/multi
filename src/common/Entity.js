import Vec2 from '../common/math/Vec2'

// quick temp id
let id = 0

export default class Entity {
  constructor () {
    this.position = new Vec2()
  }

  static create () {
    var entity = new Entity()
    entity.id = ++id
    return entity
  }

  static hydrate (data) {
    var entity = new Entity()
    entity.id = data.id
    entity.position.x = data.x
    entity.position.y = data.y
    return entity
  }
}
