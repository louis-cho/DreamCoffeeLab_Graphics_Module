import SimAssetManager from "./simAssetManager";
import SimObjectManager from "./simObjectManager";
import SimRenderer from "./simRenderer";
import SimTileManager from "./simTileManager";

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
    this._objectManager = new SimObjectManager(
      this._assetManager,
      this._tileManager
    );

    // sound manager 로드하기

    // menu 로드하기

    // request 설정
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
}
