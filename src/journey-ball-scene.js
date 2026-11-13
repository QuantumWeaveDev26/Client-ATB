import * as THREE from 'three';

export function createJourneyBall(host) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(96, 96);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.z = 4.2;
  const group = new THREE.Group(); scene.add(group);
  const felt = new THREE.MeshStandardMaterial({ color: 0xd2ed48, roughness: 0.95 });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.95, 40, 28), felt); group.add(sphere);
  const points = Array.from({ length: 145 }, (_, index) => {
    const a = index / 144 * Math.PI * 2, y = Math.sin(a * 2) * 0.64, r = Math.sqrt(1 - y * y);
    return new THREE.Vector3(Math.cos(a) * r * 0.956, y * 0.956, Math.sin(a) * r * 0.956);
  });
  const seam = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 144, 0.025, 5, true), new THREE.MeshStandardMaterial({ color: 0xf4f5dc, roughness: 0.8 }));
  group.add(seam);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4b6431, 2.2));
  const key = new THREE.DirectionalLight(0xfff7dc, 3); key.position.set(-2, 3, 5); scene.add(key);
  renderer.render(scene, camera);
  return {
    draw(turn, compression = 0, wallBounce = false) {
      group.rotation.set(turn * 0.7, turn, turn * 0.3);
      group.scale.set(wallBounce ? 1 - compression * 0.15 : 1 + compression * 0.1, wallBounce ? 1 + compression * 0.1 : 1 - compression * 0.12, 1);
      renderer.render(scene, camera);
    },
    dispose() { sphere.geometry.dispose(); felt.dispose(); seam.geometry.dispose(); seam.material.dispose(); renderer.dispose(); renderer.domElement.remove(); },
  };
}
