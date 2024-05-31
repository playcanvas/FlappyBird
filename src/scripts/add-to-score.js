import { Script } from 'playcanvas';

export class AddToScore extends Script {

    /**
     * @attribute
     * @type {pc.Entity}
     */
    bird

    initialize() {
        this.lastX = this.entity.getPosition().x;
    };

    // update code called every frame
    update(dt) {
        var app = this.app;

        var birdX = this.bird.getPosition().x;
        var pipeX = this.entity.getPosition().x;

        if ((pipeX <= birdX) && (this.lastX > birdX)) {
            app.fire('game:addscore');
        }

        this.lastX = pipeX;
    };
}