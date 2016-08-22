import THREE from 'three'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let axisHelper = new THREE.AxisHelper(5)
scene.add(axisHelper)

let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
scene.add(light)

light.color.setHSL(0.6, 1, 0.6)
light.groundColor.setHSL(0.095, 1, 0.75)
light.position.set(0, 500, 0)

scene.background = new THREE.Color(0xDDDDDD)
camera.position.z = 10
camera.position.y = 3
camera.lookAt(new THREE.Vector3(0, 0, 0))

export { camera, scene, renderer }
