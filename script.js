let score = 0;
let scoreDisplay = document.getElementById("score");
let startButton = document.getElementById("startButton");

let scene, camera, renderer;
let spheres = [];
let activeSphere = null;
let gameInterval;

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.6), 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
  document.getElementById("game-container").appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // 球体3つ作成
  for (let i = 0; i < 3; i++) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = (i - 1) * 2.5;
    scene.add(sphere);
    spheres.push(sphere);
  }

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  spheres.forEach((sphere) => {
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.005;
  });
  renderer.render(scene, camera);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 800);

  setTimeout(() => {
    clearInterval(gameInterval);
    alert("ゲーム終了！スコア: " + score);
  }, 60000); // ← 1分間
}

function showMole() {
  if (activeSphere !== null) {
    activeSphere.material.color.set(0xff69b4); // 元に戻す
  }

  const index = Math.floor(Math.random() * spheres.length);
  activeSphere = spheres[index];
  activeSphere.material.color.set(0xff0000); // 赤く表示

  // 一時的にクリックイベント
  renderer.domElement.onclick = (event) => {
    // クリック位置の正規化
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -((event.clientY / (window.innerHeight * 0.6)) * 2 - 1)
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);
    if (intersects.length > 0 && intersects[0].object === activeSphere) {
      score++;
      scoreDisplay.textContent = score;
      activeSphere.material.color.set(0xff69b4);
      activeSphere = null;
    }
  };
}

startButton.onclick = () => {
  if (!renderer) initThree();
  startGame();
};
