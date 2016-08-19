import THREE from 'three'

const makeCube = (position) => {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  let color = Math.random() * 0xffffff
  var material = new THREE.MeshPhongMaterial({ color: color })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(position.x, position.y, 0)
  return mesh
}

export default makeCube
