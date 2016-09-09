export default class EntityStore {

  constructor () {
    this.all = []
    this.byId = {}
  }

  add (entity) {
    this.all.push(entity)
    this.byId[ entity.id ] = entity
    return entity
  }

  removeById (id) {
    let removing = this.byId[ id ]
    this.all = this.all.filter((item) => {
      return removing !== item
    })
    delete this.byId[ id ]
  }
}
