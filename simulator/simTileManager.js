import * as THREE from "three";
import { data } from "./simData";

export default class SimTileManager {
  constructor(numOfRow, numOfColumn) {
    this._numOfRow = numOfRow;
    this._numOfColumn = numOfColumn;

    this._tiles = [];
    this._objects = [];
    SimTileManager.I = this;

    this.init();
  }

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
}
