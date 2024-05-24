import { createGame } from './src/game';
import { createUI } from './src/ui';
import { createCamera } from './src/camera';
import './style.css'
import { Application, AppOptions, CameraComponentSystem, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO, RenderComponentSystem, ScriptComponentSystem, ScriptType, DEVICETYPE_WEBGPU, createGraphicsDevice, LightComponentSystem, DEVICETYPE_WEBGL2, AppBase } from 'playcanvas';

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


// fill the available space at full resolution
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);


createCamera(app.root);
createGame(app.root);
createUI(app.root);


// // ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

window.app = app;

// app.start();