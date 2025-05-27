// シーン・カメラ・レンダラー
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライト
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// モグラ（ピンクの球）
const geometry = new THREE.SphereGeometry(0.7, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
const mole = new THREE.Mesh(geometry, material);
scene.add(mole);

// スコア
let score = 0;
const scoreDiv = document.getElementById('score');

// モグラの表示/非表示＋ランダム位置移動
function toggleMole() {
  mole.visible = true;
  mole.position.x = (Math.random() - 0.5) * 6;
  mole.position.y = (Math.random() - 0.5) * 4;

  // 一定時間後に非表示
  setTimeout(() => {
    mole.visible = false;
  }, 800);
}

// 1秒ごとに出現
setInterval(toggleMole, 1000);

// RaycasterでHIT判定
window.addEventListener('click', (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(mole);
  if (intersects.length > 0 && mole.visible) {
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    mole.visible = false;
  }
});

// アニメーション
function animate() {
  requestAnimationFrame(animate);
  mole.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
