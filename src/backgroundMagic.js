import * as THREE from 'three/build/three.module.js'
import { FresnelShader } from './shaders/FresnelShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let camera, scene, renderer, backgroundImage
let initialMouseX = -1, initialMouseY = -1
let longitude = 0, latitude = 0
let bottle
let meadGeneratorText, bottleCap, bottleBody
let bottleInitialPosition = new THREE.Vector3(-20, -6, -30)
let bubbles = []

const init = () => {
  let container, environmentSphere
  container = document.getElementById('backgroundContainer')

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500)
  camera.target = new THREE.Vector3(0, 0, 0)

  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.physicallyCorrectLights = true
  container.appendChild(renderer.domElement)

  scene.background = new THREE.CubeTextureLoader()
    .setPath('textures/cube/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

  scene.add(camera)
  addBottle()
  addBubbles(500)

  let directionalLight = new THREE.DirectionalLight(0xffffff, 5)
  let ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(directionalLight)
  scene.add(ambientLight)

  document.addEventListener('mousemove', onPointerMove, false)
}

const addBottle = () => {
  let loader = new GLTFLoader().setPath('models/')
  loader.load('simapullo.gltf', (gltf) => {
    bottle = gltf.scene

    bottle.position.x = bottleInitialPosition.x
    bottle.position.y = bottleInitialPosition.y
    bottle.position.z = bottleInitialPosition.z

    bottle.rotation.x = -0.25

    bottle.traverse((node) => {
      if (node.material && (node.material.isMeshStandardMaterial || (node.material.isShaderMaterial && node.material.envMap !== undefined))) {

        node.material.envMap = scene.background
        node.material.envMapIntensity = 1.5

        if (node.material.name === 'metalli') {
          node.material = new THREE.MeshStandardMaterial({
            color: node.material.color,
            metalness: 1,
            envMap: scene.background,
            roughness: 0.15,
          })
        } else if (node.material.name === 'lasi') {
          node.material = new THREE.MeshPhysicalMaterial({
            color: node.material.color,
            metalness: 0,
            roughness: 0,
            alphaTest: 0,
            envMap: scene.background,
            envMapIntensity: 1.5,
            depthTest: true,
            transparency: 0.8,
            transparent: true,
            depthWrite: false,
          })
        } else if (node.material.name === 'juoma') {
          node.material = new THREE.MeshPhysicalMaterial({
            color: node.material.color,
            metalness: 0,
            roughness: 0,
            alphaTest: 0,
            envMap: scene.background,
            envMapIntensity: 1.5,
            depthTest: true,
            transparency: 0.6,
            transparent: true,
            depthWrite: false,
          })
        }
      }
    })
    

    bottleBody = bottle.children.find( item => item.name === 'pullo' )
    bottleCap = bottle.children.find( item => item.name === 'korkki' )
    meadGeneratorText = bottle.children.find( item => item.name === 'teksti' )
    bottleBody.position.set( bottle.position.x, bottle.position.y, bottle.position.z )
    bottleCap.position.set( bottle.position.x, bottle.position.y, bottle.position.z )
    meadGeneratorText.position.set( bottle.position.x, bottle.position.y, bottle.position.z )

    camera.add(bottleBody)
    camera.add(bottleCap)
    camera.add(meadGeneratorText)
  }, undefined, (error) => {
    console.log(error)
  })
}

const addBubbles = (amount) => {
  const bubbleGeometry = new THREE.SphereBufferGeometry(10, 16, 16)
  const bubbleShader = FresnelShader
  let uniforms = THREE.UniformsUtils.clone(bubbleShader.uniforms)
  uniforms['tCube'].value = scene.background
  let bubbleMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: bubbleShader.vertexShader,
    fragmentShader: bubbleShader.fragmentShader
  })
  for (let i = 0; i < amount; i++) {
    let bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
    bubble.position.x = Math.random() * 1000 - 500
    bubble.position.y = Math.random() * 1000 - 500
    bubble.position.z = Math.random() * 1000 - 500
    bubble.scale.x = bubble.scale.y = bubble.scale.z = Math.random() * 1 + 1
    scene.add(bubble)
    bubbles.push(bubble)
  }
}

const moveBubble = (bubble, timer, i) => {
  bubble.position.x = 500 * Math.cos(timer + i)
  bubble.position.y = 500 * Math.sin(timer + i * 1.1)
}

const moveBottle = (timer) => {
  bottle.position.y = bottleInitialPosition.y + Math.sin(timer * 10)
  bottle.rotation.y += 0.02
  bottle.rotation.z = Math.cos(timer) * 0.05

  bottleBody.position.set( bottle.position.x, bottle.position.y, bottle.position.z )
  bottleBody.rotation.set( bottle.rotation.x, bottle.rotation.y, bottle.rotation.z )
  bottleCap.position.set( bottle.position.x, bottle.position.y, bottle.position.z )
  bottleCap.rotation.set( bottle.rotation.x, bottle.rotation.y, bottle.rotation.z )
  
  meadGeneratorText.position.set( bottle.position.x, bottle.position.y, bottle.position.z )
  meadGeneratorText.rotation.set( bottle.rotation.x, meadGeneratorText.rotation.y-0.02, bottle.rotation.z )
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
  const timer = Date.now() * 0.0001

  latitude = Math.max(-45, Math.min(45, latitude))
  const phi = THREE.MathUtils.degToRad(90 - latitude)
  const theta = THREE.MathUtils.degToRad(longitude)

  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta)
  camera.target.y = 500 * Math.cos(phi)
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta)

  bubbles.forEach((bubble, i) => moveBubble(bubble, timer, i))
  if (bottle !== undefined) moveBottle(timer)
  camera.lookAt(camera.target)
  renderer.render(scene, camera)
}

init()
animate()