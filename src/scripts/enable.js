import { Script } from 'playcanvas';

export class Enable extends Script {
    /**
     * @attribute
     * @type {string}
     */
    enableEvent;

    /**
     * @attribute
     * @type {string}
     */
    disableEvent

    initialize() {
        this.app.on(this.enableEvent, () => {
            this.entity.enabled = true;
        }, this);

        this.app.on(this.disableEvent, () => {
            this.entity.enabled = false;
        }, this);
    }
}