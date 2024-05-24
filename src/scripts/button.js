import { Script, Vec3 } from 'playcanvas';

export class Button extends Script {
    static attributes = {
        diplacement: { type: 'number', default: 0.00390625 },
        event: { type: 'string' }
    };

    // initialize code called once per entity
    initialize() {
        var app = this.app;

        this.pressed = false;
        this.min = new Vec3();
        this.max = new Vec3();

        app.on('ui:press', function (x, y, obj) {
            if (!obj.processed) {
                this.press(x, y, obj);
            }
        }, this);
        app.on('ui:release', function (x, y) {
            this.release();
        }, this);

        this.on('enable', function () {
            app.on('ui:press', function (x, y, obj) {
                if (!obj.processed) {
                    this.press(x, y, obj);
                }
            }, this);
            app.on('ui:release', function (x, y) {
                this.release();
            }, this);
        });
        this.on('disable', function () {
            app.off('ui:press');
            app.off('ui:release');

            this.pressed = false;
        });
    };

    checkForClick(x, y) {
        var app = this.app;
        var cameraEntity = app.root.findByName('Camera');
        var aabb = this.entity.sprite._meshInstance.aabb;
        cameraEntity.camera.worldToScreen(aabb.getMin(), this.min);
        cameraEntity.camera.worldToScreen(aabb.getMax(), this.max);
        if ((x >= this.min.x) && (x <= this.max.x) &&
            (y >= this.max.y) && (y <= this.min.y)) {
            return true;
        }
        return false;
    };

    press(x, y, obj) {
        if (this.checkForClick(x, y)) {
            this.pressed = true;
            this.entity.translate(0, -this.diplacement, 0);

            // This event has been intercepted by a button - don't send it on to the game
            obj.processed = true;
        }
    };

    release() {
        var app = this.app;

        if (this.pressed) {
            this.pressed = false;
            this.entity.translate(0, this.diplacement, 0);
            app.fire(this.event);
            app.fire('game:audio', 'Swoosh');
        }
    };
}
