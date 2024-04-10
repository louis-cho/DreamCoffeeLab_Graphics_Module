import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import models from "./models";

const baseUrl = "./simulator/asset/models/";

export default class SimAssetManager {
  constructor() {
    this.modelLoader = new GLTFLoader();
    this.modelCount = Object.keys(models).length;
    this.loadedModelCount = 0;
    this.models = {};

    this.loadModels();
  }

  async loadModels() {
    const loadPromises = [];

    for (const [name, meta] of Object.entries(models)) {
      const loadPromise = new Promise((resolve, reject) => {
        this.modelLoader.load(
          `${baseUrl}${meta.filename}`,
          (glb) => {
            let mesh = glb.scene;
            mesh.name = meta.filename;

            if (glb.animations) {
              mesh.animations = glb.animations;
            }

            mesh.rotation.set(0, THREE.MathUtils.degToRad(meta.rotation), 0);
            mesh.scale.set(meta.scale, meta.scale, meta.scale);

            this.models[name] = mesh;
            this.loadedModelCount++;

            resolve();
          },
          (xhr) => {
            console.log(`${name} ${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            console.error(`${meta.filename}: ${error}`);
            reject(error);
          }
        );
      });

      loadPromises.push(loadPromise);
    }

    await Promise.all(loadPromises);
    console.log("All models loaded");
  }

  getModel(name) {
    return this.models[name];
  }
}
