import Box from './Box'
import gridSort from './gridSort'

let bodies = []

bodies.push(new Box(5, 5, 0, 0))
bodies.push(new Box(5, 7, 5, 5))
bodies.push(new Box(2, 11, 10, 10))

let a = new Box(1,1,0,0)
let b = new Box(4, 4, 2, 2)
a.expandToContainBox(b)
console.log(a, b)

//let sorted = gridSort(bodies)

// console.log(sorted)

// loop through all bodies and assign to grid tiles
// physics bodies can be either static or dynamic
// walls etc are static
// players are dynamic
// loop
// for each dynamic
// work out which grid tile it is in
// get all bodies in the tile and 8 neighbours
// run broadphase to establish possible collision pairs
// for each pair, run narrowphase
// collision masks?
// sleep / dirty flags?
