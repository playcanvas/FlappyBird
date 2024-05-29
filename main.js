import { createGame } from './src/game';
import { createUI } from './src/ui';
import { createCamera } from './src/camera';
import './style.css'
import { Layer, Keyboard, SORTMODE_MANUAL, Application, Color, Entity, TextureAtlasHandler, FILLMODE_NONE, RESOLUTION_FIXED, RESOLUTION_AUTO, RenderComponentSystem, ScriptComponentSystem, ScriptType, DEVICETYPE_WEBGPU, createGraphicsDevice, LightComponentSystem, DEVICETYPE_WEBGL2, AppBase } from 'playcanvas';
import { loadSound, loadSoundMap } from './src/utils/sounds-utils';

const canvas = document.querySelector('#canvas');

// create a PlayCanvas application
const app = new Application(canvas, {
  keyboard: new Keyboard(window)
});
// app.init(createOptions)

// Create a new layer
var spriteLayer = new Layer({
  id:1000,
  name: "Sprite",  // Give your layer a name
  opaqueSortMode: SORTMODE_MANUAL,  // Set sorting mode
  transparentSortMode: SORTMODE_MANUAL  // Set sorting mode for transparent objects
});
app.scene.layers.pushTransparent(spriteLayer);

// fill the available space at full resolution
app.setCanvasFillMode(FILLMODE_NONE);
app.setCanvasResolution(RESOLUTION_AUTO);

// Pump up the resolution for hi-DPI devices
// app.graphicsDevice.devicePixelRatio = Math.max(2, globalThis.devicePixelRatio)

createCamera(app);
createGame(app);
createUI(app);

window.app = app

// // ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

app.start();