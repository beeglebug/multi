import THREE from 'three'

const makeCube = (position) => {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  let color = Math.random() * 0xffffff
  var material = new THREE.MeshBasicMaterial({ color: color })
  var cube = new THREE.Mesh(geometry, material)
  cube.position.set(position.x, position.y, 0)
  return cube
}

export default makeCube
