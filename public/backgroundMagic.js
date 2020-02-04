import * as THREE from './three.module.js'
import { FresnelShader } from './shaders/FresnelShader.js';

let camera, scene, renderer,backgroundImage
let initialMouseX = -1, initialMouseY = -1
let longitude = 0, latitude = 0

let bubbles = []

const init = () => {
  let container, environmentSphere
  container = document.getElementById('backgroundContainer')

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500)
  camera.target = new THREE.Vector3(0, 0, 0)

  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene.background = new THREE.CubeTextureLoader()
  .setPath( 'textures/cube/' )
  .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );

  addBubbles(500)

  container.appendChild(renderer.domElement)

  document.addEventListener('mousemove', onPointerMove, false)
}

const addBubbles = (amount) => {
  const bubbleGeometry = new THREE.SphereBufferGeometry(10, 16, 16)
  const bubbleShader = FresnelShader
  let uniforms = THREE.UniformsUtils.clone( bubbleShader.uniforms )
  uniforms[ 'tCube' ].value = scene.background
  let bubbleMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: bubbleShader.vertexShader,
    fragmentShader: bubbleShader.fragmentShader
  })
  for(let i=0; i<amount; i++){
    let bubble = new THREE.Mesh( bubbleGeometry, bubbleMaterial )
    bubble.position.x = Math.random() * 1000 - 500
    bubble.position.y = Math.random() * 1000 - 500
    bubble.position.z = Math.random() * 1000 - 500
    bubble.scale.x = bubble.scale.y = bubble.scale.z = Math.random() * 3 + 1
    scene.add( bubble )
    bubbles.push( bubble )
  }
}

const moveBubble = (bubble, timer, i) => {
  bubble.position.x = 500 * Math.cos( timer + i )
  bubble.position.y = 500 * Math.sin( timer + i * 1.1 )
}

const onPointerMove = (event) => {
  const clientX = event.clientX
  const clientY = event.clientY
  if (initialMouseX === -1) {
    initialMouseX = clientX
    initialMouseY = clientY
  } else {
    longitude = (initialMouseX - clientX) * 0.1
    latitude = (initialMouseY - clientY) * 0.1
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  update()
}

const update = () => {
  const timer = Date.now()*0.0001

  latitude = Math.max(-45, Math.min(45, latitude))
  const phi = THREE.MathUtils.degToRad(90 - latitude)
  const theta = THREE.MathUtils.degToRad(longitude)

  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta)
  camera.target.y = 500 * Math.cos(phi)
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta)

  bubbles.forEach( (bubble, i) => moveBubble(bubble, timer, i) )
  camera.lookAt(camera.target)
  renderer.render(scene, camera)
}

init()
animate()