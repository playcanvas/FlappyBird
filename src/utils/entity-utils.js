import { Entity, Script, Sprite, Vec3, Application } from 'playcanvas';

const SCRIPT_DEFAULTS = { preloading: false };
const SPRITE_DEFAULTS = {
    enabled: true,
    type: "simple",
    width: 1,
    height: 1,
    color: [1, 1, 1],
    opacity: 1,
    flipX: false,
    flipY: false,
    frame: 0,
    speed: 1,
    batchGroupId: null,
    drawOrder: 0,
    autoPlayClip: null,
    clips: {}
}

/**
 * @typedef {Object} EntityOptions
 * @property {boolean} sprites - Whether to add a sprite component.
 * @property {boolean | pc.Script[]} scripts - Whether to add a script component, or an array of script classes.
 * @property {Entity} parent - The parent entity.
 */

/**
 * Creates an entity with the given name and options.
 * 
 * @param {string} name - The name of the entity.
 * @param {EntityOptions} opts - The options for the entity.
 * @returns 
 */
export const createEntity = (name, opts = {}) => {

    const entity = new Entity(name);
    const app = Application.getApplication();

    // Add as child
    if(opts.parent && opts.parent instanceof Entity) opts.parent.addChild(entity);

    // Set position, rotation, and scale
    if (opts.position) entity.setLocalPosition(new Vec3(opts.position));
    if (opts.rotation) entity.setLocalEulerAngles(new Vec3(opts.rotation));
    if (opts.scale) entity.setLocalScale(new Vec3(opts.scale));
    if (opts.enabled !== undefined) entity.enabled = opts.enabled

    // Add camera
    if (opts.camera) {
        entity.addComponent('camera', opts.camera);
    }

    // Add Sprite
    if (opts.sprite) {
        const { frameKeys, atlas, ...spriteOpts } = opts.sprite;
        entity.addComponent('sprite', spriteOpts);
        entity.sprite.sprite = new Sprite(
            app.graphicsDevice, 
            {
                pixelsPerUnit: 100,
                frameKeys, atlas
            }
        );
    }

    // Add sounds
    if (opts.sounds ) {
        const sound = entity.addComponent('sound');

        // Add each sound
        opts.sounds.entries().forEach(([key, asset]) => {
            sound.addSlot(key, { asset });
        });
        
    }

    // Add scripts
    if (opts.scripts) {
        const component = entity.addComponent('script');

        // If scripts is an array, create each script
        if(Array.isArray(opts.scripts)) {

            // Create each script
            opts.scripts.forEach(script => {

                // If the script is a class, create it
                if(script.prototype instanceof Script) {
                    component.create(script, SCRIPT_DEFAULTS);
                } else if(script.class.prototype instanceof Script) {
                    component.create(script.class, {
                        ...SCRIPT_DEFAULTS,
                        attributes: script.options
                    });
                }
            });
        }
    }

    return entity;

}