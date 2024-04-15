export let data = {};

data.renderer = {};

data.renderer.camera = {};

data.renderer.camera.fov = 45;
data.renderer.camera.near = 1;
data.renderer.camera.far = 10000;

data.renderer.camera.lookAt = [0, 0, 0];

data.renderer.camera.position = [10, 10, 10];

data.renderer.directional = {};
data.renderer.directional.color = 0xffffff;
data.renderer.directional.intensity = 0.5;
data.renderer.directional.position = [1, 1, 1];

data.renderer.ambient = {};
data.renderer.ambient.color = 0x00ffff;
data.renderer.ambient.intensity;

data.renderer.background = {};
data.renderer.background.size = [500, 60, 40];
data.renderer.background.colorVector = [0.5, 0.7, 1.0];
data.renderer.background.color = 0x0aaaaa;

data.objectManager = {};
data.objectManager.brandId = 1;

data.assetManager = {};
data.assetManager.type = {};
data.assetManager.variation = 1;

data.tileManager = {};
data.tileManager.tile = {};
data.tileManager.tile.size = [0.92, 0.97, 0.92];
data.tileManager.tile.color = 0x555555;
