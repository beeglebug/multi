import getMaxBodySize from './getMaxBodySize'
import Box from './Box'

export default (bodies) => {
  // grid size is slightly bigger than the biggest possible physics object
  let size = getMaxBodySize(bodies)
  let slots = []
  let left = bodies.map(body => body.left)
    .reduce((val, current) => Math.min(val, current), 0)
  let right = bodies.map(body => body.right)
    .reduce((val, current) => Math.max(val, current), 0)
  let top = bodies.map(body => body.top)
    .reduce((val, current) => Math.min(val, current), 0)
  let bottom = bodies.map(body => body.top)
    .reduce((val, current) => Math.min(val, current), 0)
  let bounds = Box.fromBounds(left, top, right, bottom)

  return {
    size,
    slots,
    bounds
  }
}
