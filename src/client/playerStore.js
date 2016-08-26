import Entity from '../common/Entity'
import playerRenderable from './renderer/playerRenderable'

let playerStore = {
  all: [],
  byId: {},
  host: null,
  make: (data) => {
    let player = Entity.hydrate(data)
    player.renderable = playerRenderable(player.position, player.color)
    return player
  },
  add: (data) => {
    let player = this.make(data)
    // scene.add(player.renderable)
    this.all.push(player)
    this.byId[player.id] = player
    return player
  },
  removeById: (id) => {
    let removing = this.byId[id]
    this.players = this.players.filter((player) => {
      return removing !== player
    })
    delete this.byId[id]
    // scene.remove(removing.renderable)
  },
  updateById: (id, state) => {
    let player = this.byId[id]
    player.position.x = state.x
    player.position.y = state.y
  }
}

export default playerStore
