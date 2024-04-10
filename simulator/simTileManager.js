import * as THREE from "three";
import { data } from "./simData";
import {
  TILE_TYPE,
  FACILITY_TYPE,
  ROAD_TYPE,
  INIT_SETTING,
  CAFE_TILE_TYPE,
  FACILITY_TYPE_ORDER,
} from "./simTileEnum";
import { getRandomFloat, getRandomInt, getRandomNumbers } from "./util";

export default class SimTileManager {
  constructor(numOfRow, numOfColumn) {
    this._numOfRow = numOfRow;
    this._numOfColumn = numOfColumn;

    this._tiles = [];
    this._objects = [];

    SimTileManager.I = this;

    this.init();
  }

  /**
   * 타일 설정
   */
  init() {
    const geometry = new THREE.BoxGeometry(...data.tileManager.tile.size);
    const material = new THREE.MeshBasicMaterial({
      color: data.tileManager.tile.color,
    });
    const originTile = new THREE.Mesh(geometry, material);

    for (let i = 0; i < this._numOfRow; i++) {
      this._tiles.push([]);
      this._objects.push([]);
      for (let j = 0; j < this._numOfColumn; j++) {
        const tile = originTile.clone();
        tile.name = "tile_" + i + "_" + j;
        this._tiles[this._tiles.length - 1].push(tile);
        tile.position.set(i, 0, j);
        this._objects[this._tiles.length - 1].push(null);
      }
    }
  }

  getIndexOf(object) {
    for (let i = 0; i < this._numOfRow; i++) {
      for (let j = 0; j < this._numOfColumn; j++) {
        if (this._tiles[i][j] == object || this._objects[i][j] == object) {
          return [i, j];
        }
      }
    }

    return null;
  }
}
