import p2 from 'p2'

function addCircleToWorld (world) {
  let body = new p2.Body({
    mass: 0,
    position: [ 0, 10 ]
  })

  let shape = new p2.Circle({ radius: 1 })
  body.addShape(shape)

  world.addBody(body)
}

function addBoxToWorld (world) {
  let body = new p2.Body({
    mass: 0,
    position: [ 0, 10 ]
  })

  let shape = new p2.Box({ width: 1, height: 1 })
  body.addShape(shape)

  world.addBody(body)
}

export const test = () => {

  let world = new p2.World()

  world.applyGravity = false
  world.applySpringForces = false

  console.log('setting up')

  for (let i = 0; i < 100; i++) {
    addCircleToWorld(world)
  }

  console.log('added circles')

  for (let j = 0; j < 100; j++) {
    addBoxToWorld(world)
  }

  console.log('added boxes')

  let fixedTimeStep = 1 / 20

  setInterval(() => {
    world.step(fixedTimeStep)
    console.log(world.time)
  }, fixedTimeStep)
}
