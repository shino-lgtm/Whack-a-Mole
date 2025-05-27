let score = 0;
let scoreDisplay = document.getElementById("score");
let startButton = document.getElementById("startButton");

let scene, camera, renderer;
let spheres = [];
let activeSphere = null;
let gameInterval;

function initThree() {
  const container = document.getElementById("game-container");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  for (let i = 0; i < 3; i++) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = (i - 1) * 2.5;
    scene.add(sphere);
    spheres.push(sphere);
  }

  animate();

  renderer.domElement.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
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
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 1000);

  setTimeout(() => {
    clearInterval(gameInterval);
    alert("ゲーム終了！スコア: " + score);
  }, 30000);
}

function showMole() {
  if (activeSphere) {
    activeSphere.material.color.set(0xff69b4);
  }

  const index = Math.floor(Math.random() * spheres.length);
  activeSphere = spheres[index];
  activeSphere.material.color.set(0xff0000);
}

startButton.addEventListener("click", () => {
  if (!renderer) initThree();
  startGame();
});
