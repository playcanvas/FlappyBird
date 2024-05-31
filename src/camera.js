import { PROJECTION_ORTHOGRAPHIC } from "playcanvas";
import { createEntity } from "./utils/entity-utils";
import { CameraAspect } from "./scripts/camera-aspect";

/**
  * Create the camera entity
  */
export const createCamera = (app) => {

    const parent = app.root;
    const layer = app.scene.layers.getLayerByName("Sprite").id

    // Camera component settings
    const cameraComponentSettings = {
        projection: 1,
        farClip: 2,
        rect: [0, 0, 1, 1],
        priority: 0,
        fov: 45,
        clearDepthBuffer: false,
        clearColor: [250, 235, 215, 1],
        enabled: true,
        orthoHeight: 1.28,
        nearClip: 0,
        clearColorBuffer: true,
        frustumCulling: false,
        layers: [layer]
    }


    // Create the camera entity
    return createEntity('Camera', {
        position: [0, 0, 1], // Set the position of the camera
        camera: cameraComponentSettings, // Add camera component with settings
        scripts: [CameraAspect], // Add CameraAspect script
        parent, // Set the parent entity to add to
    });
}
