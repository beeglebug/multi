import THREE from 'three'

const playerRenderable = (position, color) => {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  var material = new THREE.MeshPhongMaterial({ color: color })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(position.x, position.y, 0)
  return mesh
}

export default playerRenderable
