import * as THREE from 'three';
import { journeyBallActive } from './ballJourneyBridge.js';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;

// A generic, authored equipment model. No branded or academy-specific product claims.
export function createTennisScene(host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.setClearColor(0x15392e, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 60);
  camera.position.set(0, 0.15, 11.8);
  camera.lookAt(0, -0.25, 0);
  scene.add(new THREE.HemisphereLight(0xe9f5df, 0x233c2b, 2.5));
  const key = new THREE.DirectionalLight(0xfff5d9, 5.2);
  key.position.set(3.5, 6, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.1, far: 24 });
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.00025;
  scene.add(key);
  const rimLight = new THREE.DirectionalLight(0xd5f47e, 3);
  rimLight.position.set(-4, 2.5, -2);
  scene.add(rimLight);
  const fill = new THREE.DirectionalLight(0xd8e7ff, 1.6);
  fill.position.set(-5, 0, 5);
  scene.add(fill);

  const graphite = new THREE.MeshPhysicalMaterial({ color: 0x151c1a, metalness: 0.55, roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.3 });
  const paint = new THREE.MeshPhysicalMaterial({ color: 0xd8f36a, metalness: 0.2, roughness: 0.35, clearcoat: 0.5 });
  const white = new THREE.MeshStandardMaterial({ color: 0xecebdc, roughness: 0.75 });
  const gripMaterial = new THREE.MeshStandardMaterial({ color: 0x262e29, roughness: 0.95 });
  const racket = new THREE.Group();
  scene.add(racket);

  const addMesh = (geometry, material, parent = racket) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const beam = (start, end, radius, material, parent = racket) => {
    const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
    const mesh = addMesh(new THREE.CylinderGeometry(radius, radius, a.distanceTo(b), 12), material, parent);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
    return mesh;
  };

  const head = addMesh(new THREE.TorusGeometry(1.23, 0.09, 16, 112), graphite);
  head.position.y = 0.85;
  head.scale.y = 1.33;
  const rim = addMesh(new THREE.TorusGeometry(1.235, 0.036, 10, 112), paint);
  rim.position.set(0, 0.85, 0.079);
  rim.scale.y = 1.33;
  const innerRim = addMesh(new THREE.TorusGeometry(1.13, 0.021, 8, 100), white);
  innerRim.position.set(0, 0.85, 0.02);
  innerRim.scale.y = 1.33;
  beam([-0.73, -0.44, 0], [-0.12, -1.72, 0], 0.065, graphite);
  beam([0.73, -0.44, 0], [0.12, -1.72, 0], 0.065, graphite);
  beam([-0.64, -0.59, 0.055], [-0.09, -1.7, 0.055], 0.018, paint);
  beam([0.64, -0.59, 0.055], [0.09, -1.7, 0.055], 0.018, paint);
  const bridge = addMesh(new THREE.TorusGeometry(0.55, 0.045, 8, 30, Math.PI), graphite);
  bridge.rotation.z = Math.PI;
  bridge.position.set(0, -0.52, 0);
  bridge.scale.y = 0.6;
  const handle = addMesh(new THREE.CylinderGeometry(0.125, 0.14, 1.48, 8), gripMaterial);
  handle.position.y = -2.42;
  const butt = addMesh(new THREE.CylinderGeometry(0.16, 0.16, 0.13, 8), paint);
  butt.position.y = -3.2;
  for (let i = 0; i < 16; i += 1) {
    const wrap = addMesh(new THREE.TorusGeometry(0.137, 0.011, 5, 20), i === 0 ? paint : graphite);
    wrap.rotation.x = Math.PI / 2;
    wrap.rotation.z = 0.12;
    wrap.position.y = -1.76 - i * 0.087;
  }

  const stringVertices = [];
  function string(a, b) {
    for (let s = 0; s < 12; s += 1) {
      for (const t of [s / 12, (s + 1) / 12]) stringVertices.push(mix(a[0], b[0], t), mix(a[1], b[1], t), 0.025);
    }
  }
  const rx = 1.12, ry = 1.49;
  for (let i = -8; i <= 8; i += 1) {
    const x = i * rx / 9;
    const y = ry * Math.sqrt(1 - x * x / (rx * rx));
    string([x, 0.85 - y], [x, 0.85 + y]);
  }
  for (let i = -11; i <= 11; i += 1) {
    const y = i * ry / 12;
    const x = rx * Math.sqrt(1 - y * y / (ry * ry));
    string([-x, 0.85 + y], [x, 0.85 + y]);
  }
  const stringGeometry = new THREE.BufferGeometry();
  stringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stringVertices, 3));
  const strings = new THREE.LineSegments(stringGeometry, new THREE.LineBasicMaterial({ color: 0xf5f1dc, transparent: true, opacity: 0.72 }));
  racket.add(strings);

  const ball = new THREE.Group();
  scene.add(ball);
  const ballMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc9ec3c, roughness: 1, metalness: 0, sheen: 1, sheenColor: new THREE.Color(0xd8ec75), sheenRoughness: 1 });
  addMesh(new THREE.SphereGeometry(0.275, 40, 28), ballMaterial, ball);
  const seamPoints = Array.from({ length: 145 }, (_, i) => {
    const angle = i / 144 * Math.PI * 2;
    const y = Math.sin(angle * 2) * 0.64;
    const radius = Math.sqrt(1 - y * y);
    return new THREE.Vector3(Math.cos(angle) * radius * 0.278, y * 0.278, Math.sin(angle) * radius * 0.278);
  });
  addMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(seamPoints, true), 144, 0.012, 5, true), white, ball);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(28, 20), new THREE.ShadowMaterial({ opacity: 0.25 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.6;
  floor.receiveShadow = true;
  scene.add(floor);
  const courtPoints = [-4.5, -3.55, 2, 4.5, -3.55, 2, 4.5, -3.55, 2, 4.5, -3.55, -3, 4.5, -3.55, -3, -4.5, -3.55, -3, -4.5, -3.55, -3, -4.5, -3.55, 2, -3.4, -3.55, 2, -3.4, -3.55, -3, 3.4, -3.55, 2, 3.4, -3.55, -3];
  const court = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(courtPoints, 3)), new THREE.LineBasicMaterial({ color: 0xc5d7a9, transparent: true, opacity: 0.19 }));
  scene.add(court);

  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(48 * 3);
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  const trail = new THREE.Line(trailGeometry, new THREE.LineBasicMaterial({ color: 0xd8f36a, transparent: true, opacity: 0.16 }));
  scene.add(trail);

  function pose(progress) {
    const swing = ease((progress - 0.12) / 0.76);
    racket.rotation.set(mix(0.1, -0.2, swing), mix(-0.55, 0.35, swing), mix(-0.62, 0.75, swing));
    racket.position.set(mix(-0.45, 0.35, swing), -0.05 + Math.sin(swing * Math.PI) * 0.13, 0);
  }
  pose(0.52);
  racket.updateMatrixWorld(true);
  const contact = new THREE.Vector3(0, 0.85, 0.3).applyMatrix4(racket.matrixWorld);
  const incoming = new THREE.CubicBezierCurve3(new THREE.Vector3(3.8, 2.05, 0.9), new THREE.Vector3(2.7, 1.7, 0.65), new THREE.Vector3(1.2, 1, 0.5), contact);
  const outgoing = new THREE.CubicBezierCurve3(contact, new THREE.Vector3(-1.2, 1.6, 1), new THREE.Vector3(-2.4, 0.3, 1.7), new THREE.Vector3(-3.8, -2.35, 2));
  const ballPosition = (p) => p <= 0.52 ? incoming.getPoint(clamp(p / 0.52)) : outgoing.getPoint(clamp((p - 0.52) / 0.48));

  function draw(progress) {
    const p = clamp(progress);
    pose(p);
    ball.position.copy(ballPosition(p));
    ball.visible = !journeyBallActive();
    ball.rotation.set(p * 12, p * 17, p * 5);
    const hit = Math.max(0, 1 - Math.abs(p - 0.52) / 0.035);
    ball.scale.set(1 + hit * 0.1, 1 + hit * 0.03, 1 - hit * 0.14);
    const positions = stringGeometry.attributes.position;
    for (let i = 0; i < positions.count; i += 1) {
      const x = stringVertices[i * 3], y = stringVertices[i * 3 + 1] - 0.85;
      positions.array[i * 3 + 2] = 0.025 - hit * 0.15 * Math.exp(-(x * x + y * y) * 3);
    }
    positions.needsUpdate = true;
    for (let i = 0; i < 48; i += 1) {
      const point = ballPosition(Math.max(0, p - (47 - i) * 0.002));
      trailPositions[i * 3] = point.x;
      trailPositions[i * 3 + 1] = point.y;
      trailPositions[i * 3 + 2] = point.z;
    }
    trailGeometry.attributes.position.needsUpdate = true;
    trail.visible = p > 0.01 && hit < 0.8;
    renderer.render(scene, camera);
  }

  function resize() {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 520 ? 13.6 : 11.8;
    // Keep the whole ball trajectory inside the narrower portrait stage.
    const portrait = width < 520;
    incoming.v0.x = portrait ? 2.8 : 3.8;
    incoming.v1.x = portrait ? 2.1 : 2.7;
    outgoing.v2.x = portrait ? -1.9 : -2.4;
    outgoing.v3.x = portrait ? -2.8 : -3.8;
    camera.updateProjectionMatrix();
  }

  function dispose() {
    const geometries = new Set(), materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    key.shadow.map?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }
  resize();
  draw(0);
  function projectBall(progress) {
    const position = ballPosition(clamp(progress));
    const projected = position.clone().project(camera);
    const bounds = host.getBoundingClientRect();
    const size = 0.55 * bounds.height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - position.z));
    return { x: bounds.left + (projected.x + 1) * bounds.width / 2, y: bounds.top + (1 - projected.y) * bounds.height / 2, size };
  }
  return { draw, resize, dispose, projectBall, canvas: renderer.domElement };
}
