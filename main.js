import { createGame } from './src/game';
import { createUI } from './src/ui';
import { createCamera } from './src/camera';
import './style.css'
import { Layer, SORTMODE_MANUAL, Application, Color, Entity, TextureAtlasHandler, FILLMODE_NONE, RESOLUTION_FIXED, RESOLUTION_AUTO, RenderComponentSystem, ScriptComponentSystem, ScriptType, DEVICETYPE_WEBGPU, createGraphicsDevice, LightComponentSystem, DEVICETYPE_WEBGL2, AppBase } from 'playcanvas';

const canvas = document.querySelector('#canvas');

// const device = await createGraphicsDevice(canvas, { deviceTypes:[DEVICETYPE_WEBGL2]});
// const createOptions = new AppOptions();
// createOptions.graphicsDevice = device;

// createOptions.componentSystems = [
//   RenderComponentSystem, 
//   CameraComponentSystem,
//   // LightComponentSystem, 
//   ScriptComponentSystem
// ];

// createOptions.resourceHandlers = [pc.TextureHandler, ContainerHandler];


// create a PlayCanvas application
const app = new Application(canvas);
// app.init(createOptions)

// Create a new layer
var spriteLayer = new Layer({
  name: "Sprite",  // Give your layer a name
  opaqueSortMode: SORTMODE_MANUAL,  // Set sorting mode
  transparentSortMode: SORTMODE_MANUAL  // Set sorting mode for transparent objects
});
app.scene.layers.pushTransparent(spriteLayer);

// // create box entity
// const box = new Entity('cube');
// box.addComponent('model', {
//   type: 'box'
// });
// app.root.addChild(box);


// // create camera entity
// const camera = new Entity('camera');
// camera.addComponent('camera', {
//   clearColor: new Color(0.1, 0.2, 0.3)
// });
// app.root.addChild(camera);
// camera.setPosition(0, 0, 3);

// // create directional light entity
// const light = new Entity('light');
// light.addComponent('light');
// app.root.addChild(light);
// light.setEulerAngles(45, 0, 0);

// rotate the box according to the delta time since the last frame
// app.on('update', dt => box.rotate(10 * dt, 20 * dt, 30 * dt));


// fill the available space at full resolution
app.setCanvasFillMode(FILLMODE_NONE);
app.setCanvasResolution(RESOLUTION_AUTO);

// Pump up the resolution for hi-DPI devices
app.graphicsDevice.devicePixelRatio = Math.max(2, globalThis.devicePixelRatio)

createCamera(app);
createGame(app);
createUI(app);

window.app = app

// // ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

app.start();