import { Entity, Script, Sprite } from 'playcanvas';

const SCRIPT_DEFAULTS = { preloading: true };

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

    // Add as child
    if(opts.parent && opts.parent instanceof Entity) opts.parent.addChild(entity);

    // Set position, rotation, and scale
    if (opts.position) entity.setLocalPosition(opts.position);
    if (opts.rotation) entity.setLocalEulerAngles(opts.rotation);
    if (opts.scale) entity.setLocalScale(opts.scale);

    // Add camera
    if (opts.camera) {
        entity.addComponent('camera', opts.camera);
    }

    // Add camera
    if (opts.sprite) {
        const sprite = new Sprite()
        entity.addComponent('sprite', opts.sprite);
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