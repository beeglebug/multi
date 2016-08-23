const cameraFollow = (entity, camera) => {
  if (!entity) { return }
  camera.position.x = entity.position.x
  camera.position.y = entity.position.y - 3
  camera.position.z = 10
  camera.lookAt(entity.position)
}

export default cameraFollow
