import { Script, math } from 'playcanvas';

export class CameraAspect extends Script {
    initialize() {
        this.currentOrthoHeight = this.entity.camera.orthoHeight;
    };

    update(t) {
        var canvas = this.app.graphicsDevice.canvas;
        var aspectRatio = canvas.width / canvas.height;
        var orthoHeight = math.clamp(0.72 / aspectRatio, 1, 2);
        if (orthoHeight !== this.currentOrthoHeight) {
            this.entity.camera.orthoHeight = orthoHeight;
            this.currentOrthoHeight = orthoHeight;
        }
    }
}

