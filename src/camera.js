import { PROJECTION_ORTHOGRAPHIC } from "playcanvas";
import { createEntity } from "./utils/entity-utils";
import { CameraAspect } from "./scripts/camera-aspect";

/**
  * Create the camera entity
  */
export const createCamera = (parent) => {

    // Camera component settings
    const cameraComponentSettings = {
        projection: PROJECTION_ORTHOGRAPHIC,
        nearClip: 1.28,
        farClip: 2
    }

    // Create the camera entity
    return createEntity('camera', {
        position: [0, 0, 1], // Set the position of the camera
        camera: cameraComponentSettings, // Add camera component with settings
        scripts: [CameraAspect], // Add CameraAspect script
        parent // Set the parent entity to add to
    });
}
