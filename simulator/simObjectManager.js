import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

export default class SimObjectManager {
  constructor(app) {
    this._app = app;
    this._textureLoader = new THREE.TextureLoader();
  }

  setTile(tile) {
    for (let i = 0; i < this._tileManager._numOfRow; i++) {
      for (let j = 0; j < this._tileManager._numOfColumn; j++) {
        let modelName = this._tileManager._tiles[i][j].getModelName();
        if (!modelName.includes("empty")) {
          const model = this._assetManager.getModel(modelName);

          const position = this._tileSystem._tiles[i][j].position;
          if (model) {
            let object = null;
            if (modelName.includes("clerk")) {
              object = SkeletonUtils.clone(model);
              this.addSpriteToMesh(
                object,
                "brand/" + data.objectManager.brandId
              );
            } else {
              object = model.clone();
            }
            object.position.set(position.x, position.y, position.z);
            this.tileSystem.addObject(i, j, object);
          } else {
            console.error(`Model '${modelName}' not found in AssetManager`);
          }
        }
      }
    }
  }

  setHuman() {}

  setIcon() {}

  addObject(x, y, object) {
    object.scale.set(0.7, 0.7, 0.7);
    this._app._tileManager._objects[x][y] = object;
    let pos = this._app._tileManager._tiles[x][y].position;
    object.position.set(pos.x, pos.y + 0.5, pos.z);
    this._app._renderer._scene.add(object);
  }

  getObject() {}

  deleteObjectByCoord(x, y) {}

  deleteObject(object) {
    object.traverse((component) => {
      if (component.geometry) {
        component.geometry.dispose();
      }
      if (component.material) {
        component.material.dispose();
      }
    });

    object = null;
  }
}
