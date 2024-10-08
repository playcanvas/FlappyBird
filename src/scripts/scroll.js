import { Script } from 'playcanvas';

export class Scroll extends Script {
    /**
     * @attribute
     */
    startEvent = 'start'

    /**
     * @attribute
     */
    stopEvent = 'stop'

    /**
     * @attribute
     */
    resetEvent = 'reset'

    /**
     * @attribute
     */
    cycleEvent = 'cycle'

    /**
     * @attribute
     */
    startX = 1

    /**
     * @attribute
     */
    endX = 1

    /**
     * @attribute
     */
    speed = 1

    /**
     * @attribute
     */
    frozen = false

    initialize() {
        var app = this.app;

        this.paused = false;
        this.initialPos = this.entity.getPosition().clone();
        this.initialRot = this.entity.getRotation().clone();

        app.on(this.resetEvent, function () {
            this.entity.setPosition(this.initialPos);
            this.entity.setRotation(this.initialRot);
        }, this);
        app.on(this.startEvent, function () {
            this.frozen = false;
        }, this);
        app.on(this.stopEvent, function () {
            this.frozen = true;
        }, this);
        app.on('game:pause', function () {
            this.paused = true;
        }, this);
        app.on('game:unpause', function () {
            this.paused = false;
        }, this);
    };

    // update code called every frame
    update(dt) {
        var app = this.app;

        if (!this.frozen && !this.paused) {
            this.entity.translateLocal(this.speed * dt / (1/60), 0, 0);
            
            // Check to see if we've scrolled beyond the window...
            var pos = this.entity.getLocalPosition();
            if (pos.x < this.endX) {
                // Translate back to the start
                this.entity.translateLocal(this.startX - this.endX, 0, 0);
                app.fire(this.cycleEvent);
            }
        }
    }
}
