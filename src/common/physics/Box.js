import Vec2 from './Vec2'

export default class Box {
  constructor (width = 1, height = 1, x = 0, y = 0) {
    this.height = height
    this.width = width
    this.position = new Vec2(x, y)
  }

  get left () {
    return this.position.x - this.width / 2
  }

  get right () {
    return this.position.x + this.width / 2
  }

  get top () {
    return this.position.y - this.height / 2
  }

  get bottom () {
    return this.position.y + this.height / 2
  }

  static fromBounds (left, top, right, bottom) {
    let w = right - left
    let h = bottom - top
    let x = w / 2
    let y = h / 2
    return new Box(w, h, x, y)
  }
}
