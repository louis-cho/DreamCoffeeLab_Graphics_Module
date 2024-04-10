import SimAssetManager from "./simAssetManager";
import SimObjectManager from "./simObjectManager";
import SimRenderer from "./simRenderer";
import SimTileManager from "./simTileManager";
import * as THREE from "three";
import {
  findRootParent,
  flattenArray,
  getNormalizedDeviceCoordinates,
} from "./util";

// 시뮬레이션에 필요한 객체들을 관리한다.
export class SimApp {
  constructor(div) {
    this._div = div;

    this._renderer = new SimRenderer(this._div); // 렌더러 설정

    this._tileManager;

    this._assetManager;

    this._eventHandler;

    this._soundManager;

    this._menu;

    this._request;

    this._raycaster = new THREE.Raycaster();

    SimApp.I = this;
    this.init();
  }

  // 초기 환경 설정
  init() {
    // asset manager 로드하기
    this._assetManager = new SimAssetManager();

    // tile manager 로드하기
    this._tileManager = new SimTileManager(3, 10);
    this.initTileManager();

    // object manager 로드하기
    this._objectManager = new SimObjectManager(this);

    // sound manager 로드하기

    // menu 로드하기

    // request 설정

    this._div.addEventListener("pointerdown", SimApp.I.handleMouseDown);
  }

  initTileManager() {
    let tiles = this._tileManager._tiles;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        this._renderer._scene.add(tiles[i][j]);
      }
    }
  }

  run() {}

  handleMouseDown(event) {
    event.preventDefault();

    const { x, y } = getNormalizedDeviceCoordinates(
      SimApp.I._div,
      event.clientX,
      event.clientY
    );

    // 카메라의 월드 좌표로 변환
    SimApp.I._raycaster.setFromCamera(
      new THREE.Vector2(x, y),
      SimApp.I._renderer._camera
    );
    let tiles = SimApp.I._tileManager._tiles;
    let objects = SimApp.I._tileManager._objects;
    let res = flattenArray(tiles).concat(flattenArray(objects));
    console.log(res);
    const intersects = SimApp.I._raycaster.intersectObjects(res, true);

    if (intersects.length > 0) {
      // 첫 번째 교차점의 위치를 가져옵니다.
      const intersectionPoint = intersects[0].point;
      const intersectionObject = intersects[0].object;

      const object = findRootParent(intersectionObject);
      console.log("Clicked at object:", object);

      if (object) {
        let location = SimApp.I._tileManager.getIndexOf(object);
        if (location) {
          let newObject = SimApp.I._assetManager
            .getModel("facility_bank_2")
            .clone();
          SimApp.I._objectManager.addObject(...location, newObject);
        }
      }

      console.log("Intersection point:", intersectionPoint);
    } else {
      console.log("Clicked at empty space");
    }
  }
}
