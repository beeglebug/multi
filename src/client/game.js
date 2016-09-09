import EntityStore from './EntityStore'

let game = {
  latency: 0,
  player: null,
  entities: new EntityStore()
}

export default game
