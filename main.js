import { TouchDevice, Layer, Keyboard, SORTMODE_MANUAL, Application, FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import { createGame } from './src/game';
import { createUI } from './src/ui';
import { createCamera } from './src/camera';
import * as TWEEN from '@tweenjs/tween.js';
import './style.css'

const canvas = document.querySelector('#canvas');

// create a PlayCanvas application
const app = new Application(canvas, {
  keyboard: new Keyboard(window),
  touch: new TouchDevice(window),
});

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

// Update tween
app.on('update', _ => app.timeScale > 0 && TWEEN.update() );

// ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());


// Create the game entities
createCamera(app);
createGame(app);
createUI(app);

window.app = app;

app.start();