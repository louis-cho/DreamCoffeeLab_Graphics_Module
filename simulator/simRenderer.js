import * as THREE from "three";
import { data } from "./simData";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "stats.js";
// 렌더링 화면을 제공한다.
export default class SimRenderer {
  constructor(div) {
    this._div = div;

    SimRenderer.I = this;

    this.init();
  }

  init() {
    this._clock = new THREE.Clock();
    this.createCanvas();
  }

  createCanvas() {
    const width = this._div.clientWidth;
    const height = this._div.clientHeight;

    this._renderer = new THREE.WebGLRenderer();

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      data.renderer.camera.fov,
      width / height,
      data.renderer.camera.near,
      data.renderer.camera.far
    );

    this._camera.position.set(...data.renderer.camera.position);
    this._camera.lookAt(new THREE.Vector3(...data.renderer.camera.lookAt));

    // this.createStats();
    this.createLight();
    this.createBackground();
    // this.createCube();
    this.createControls();

    this._div.appendChild(SimRenderer.I._renderer.domElement);
    window.onresize = SimRenderer.I.updateRendererSize;

    this.updateRendererSize();

    this.animation();
  }

  createCube() {
    for (let i = 0; i < 1000; i++) {
      const geometry = new THREE.BoxGeometry(10, 10, 10);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = Math.random() * 100 - 50;
      cube.position.y = Math.random() * 100 - 50;
      cube.position.z = Math.random() * 100 - 50;
      SimRenderer.I._scene.add(cube);
    }
  }

  createBackground() {
    SimRenderer.I._scene.background = new THREE.Color(
      data.renderer.background.color
    );

    const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

    const fragmentShader = `
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
        gl_FragColor = vec4((vUv.y + 0.3) * uColor, 1.0);
    }
    `;
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: {
          value: new THREE.Vector3(...data.renderer.background.colorVector),
        }, // 새로운 uniform 변수 초기값 설정
      },
    });

    // 큐브나 스피어 기하체 생성
    const geometry = new THREE.SphereGeometry(...data.renderer.background.size);
    // ShaderMaterial을 사용하는 메시 생성
    const sky = new THREE.Mesh(geometry, material);
    // 씬에 추가
    SimRenderer.I._scene.add(sky);
  }

  createLight() {
    const ambientLight = new THREE.AmbientLight(
      data.renderer.ambient.color,
      data.renderer.ambient.intensity
    );
    SimRenderer.I._scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      data.renderer.directional.color,
      data.renderer.directional.intensity
    );

    directionalLight.position.set(...data.renderer.directional.position); // 광원의 방향 설정
    SimRenderer.I._scene.add(directionalLight);
  }

  createControls() {
    SimRenderer.I._controls = new OrbitControls(
      SimRenderer.I._camera,
      SimRenderer.I._renderer.domElement
    );
  }

  animation() {
    if (SimRenderer.I._stats) SimRenderer.I._stats.begin();

    requestAnimationFrame(SimRenderer.I.animation);
    SimRenderer.I._controls.update();
    let delta = SimRenderer.I._clock.getDelta();
    SimRenderer.I._renderer.render(SimRenderer.I._scene, SimRenderer.I._camera);

    if (SimRenderer.I._stats) SimRenderer.I._stats.end();
  }

  createStats() {
    this._stats = new Stats();
    this._stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this._div.appendChild(SimRenderer.I._stats.dom);
  }

  updateRendererSize() {
    SimRenderer.I._renderer.domElement.style.width = window.innerWidth + "px";
    SimRenderer.I._renderer.domElement.style.height = window.innerHeight + "px";

    const width = SimRenderer.I._renderer.domElement.clientWidth;
    const height = SimRenderer.I._renderer.domElement.clientHeight;

    console.log(width + "," + height);

    // 카메라 비율 업데이트
    SimRenderer.I._camera.aspect = width / height;
    SimRenderer.I._camera.updateProjectionMatrix();

    // 렌더러 크기 업데이트
    SimRenderer.I._renderer.setSize(width, height);
  }
}
