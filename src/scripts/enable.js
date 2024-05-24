import { Script } from 'playcanvas';

export class Enable extends Script {
    static attributes = {
        enableEvent: { type: 'string' },
        disableEvent: { type: 'string' }
    };

    initialize() {
        this.app.on(this.enableEvent, () => {
            this.entity.enabled = true;
        }, this);

        this.app.on(this.disableEvent, () => {
            this.entity.enabled = false;
        }, this);
    }
}