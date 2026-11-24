import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const clamp = THREE.MathUtils.clamp;
const ease = (value: number) => { const t = clamp(value, 0, 1); return t * t * (3 - 2 * t); };

export async function createLogoScene(host: HTMLElement, signal: AbortSignal, portalHost: HTMLElement) {
  const response = await fetch("/models/logo.obj", { signal });
  if (!response.ok) throw new Error("Logo model unavailable");
  const source = await response.text();
  signal.throwIfAborted();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .02, 100);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x69518c, metalness: .45, roughness: .27,
    clearcoat: .65, clearcoatRoughness: .2, transparent: true,
  });
  const model = new OBJLoader().parse(source);
  const bounds = new THREE.Box3().setFromObject(model);
  const center = bounds.getCenter(new THREE.Vector3());
  const scale = 6.4 / bounds.getSize(new THREE.Vector3()).x;
  const assembly = new THREE.Group();
  const pieces: { mesh: THREE.Mesh; origin: THREE.Vector3; radius: number; front: number }[] = [];
  model.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return;
    const previous = Array.isArray(child.material) ? child.material : [child.material];
    previous.forEach(value => value.dispose());
    child.geometry.computeBoundingBox();
    const pivot = child.geometry.boundingBox!.getCenter(new THREE.Vector3());
    child.geometry.translate(-pivot.x, -pivot.y, -pivot.z);
    child.geometry.scale(scale, scale, scale);
    child.position.copy(pivot.sub(center).multiplyScalar(scale));
    child.material = material;
    const origin = child.position.clone();
    child.geometry.computeBoundingBox();
    const box = child.geometry.boundingBox!;
    const size = box.getSize(new THREE.Vector3());
    pieces.push({ mesh: child, origin, radius: Math.min(size.x, size.y) / 2, front: box.max.z });
  });
  pieces.forEach(({ mesh }) => assembly.add(mesh));
  scene.add(assembly);
  scene.add(new THREE.HemisphereLight(0xeae1ff, 0x57406f, .8));
  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  light.position.set(-3, 5, 8);
  scene.add(light);
  const rim = new THREE.DirectionalLight(0xbba2ff, 3);
  rim.position.set(4, 1, -3);
  scene.add(rim);

  let progress = 0;
  let baseDistance = 13.5;
  // The smallest part is the circular dot in the supplied OBJ, not an invented portal.
  const dot = [...pieces].sort((a, b) => a.radius - b.radius)[0];
  // Choose each trajectory once. Scrubbing back to a scroll position reproduces the same pose.
  const motions = pieces.map(piece => {
    const isDot = piece === dot;
    const travel = isDot ? new THREE.Vector3(-.65, .55, .35)
      : piece.origin.clone().sub(dot.origin).normalize().multiplyScalar(2.8);
    travel.x += THREE.MathUtils.randFloatSpread(isDot ? .4 : 1);
    travel.y += THREE.MathUtils.randFloatSpread(isDot ? .3 : .9);
    travel.z += isDot ? 0 : THREE.MathUtils.randFloat(-1.6, -.6);
    const bend = new THREE.Vector3(-travel.y, travel.x, .2).normalize()
      .multiplyScalar(THREE.MathUtils.randFloat(.35, .95) * (Math.random() < .5 ? -1 : 1));
    const spin = new THREE.Vector3(THREE.MathUtils.randFloatSpread(1.2),
      THREE.MathUtils.randFloat(.6, 1.45) * (Math.random() < .5 ? -1 : 1), THREE.MathUtils.randFloatSpread(1.8));
    return { piece, isDot, travel, bend, spin, delay: THREE.MathUtils.randFloat(0, .045) };
  });
  const target = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const edge = new THREE.Vector3();
  const focus = new THREE.Vector3();
  const render = () => {
    const aim = ease(progress / .42);
    const zoom = ease((progress - .12) / .88);
    for (const { piece, isDot, travel, bend, spin, delay } of motions) {
      const t = ease((progress - delay) / ((isDot ? .42 : .72) - delay));
      const arc = Math.sin(Math.PI * t);
      const amount = isDot ? arc : t;
      piece.mesh.position.copy(piece.origin).addScaledVector(travel, amount)
        .addScaledVector(bend, Math.sin(2 * Math.PI * t) * arc);
      piece.mesh.rotation.set(spin.x * amount, spin.y * amount, spin.z * amount);
    }
    assembly.rotation.set(.14 * (1 - aim), -.32 * (1 - aim), 0);
    assembly.updateMatrixWorld(true);
    target.set(0, 0, dot.front).applyMatrix4(dot.mesh.matrixWorld);
    const distance = baseDistance * Math.pow(.065 / baseDistance, zoom);
    camera.position.set(target.x * aim, target.y * aim, target.z + distance);
    focus.set(camera.position.x, camera.position.y, target.z);
    camera.lookAt(focus);
    camera.updateMatrixWorld(true);
    projected.copy(target).project(camera);
    edge.set(dot.radius * .72, 0, dot.front).applyMatrix4(dot.mesh.matrixWorld).project(camera);
    const x = (projected.x * .5 + .5) * host.clientWidth;
    const y = (-projected.y * .5 + .5) * host.clientHeight;
    const opening = ease((progress - .42) / .2);
    const radius = Math.min(Math.hypot(host.clientWidth, host.clientHeight) * 2, Math.abs(edge.x - projected.x) * .5 * host.clientWidth * opening);
    portalHost.style.setProperty("--portal-x", `${x}px`);
    portalHost.style.setProperty("--portal-y", `${y}px`);
    portalHost.style.setProperty("--portal-radius", `${radius}px`);
    material.opacity = 1 - ease((progress - .97) / .03);
    renderer.render(scene, camera);
    host.dataset.progress = progress.toFixed(3);
  };
  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    const vertical = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    baseDistance = Math.max(13.5, 7.8 / (vertical * camera.aspect));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  };
  host.append(renderer.domElement);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  return {
    setProgress(value: number) { progress = value; render(); },
    dispose() {
      observer.disconnect();
      pieces.forEach(({ mesh }) => mesh.geometry.dispose());
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
