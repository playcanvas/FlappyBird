import { Entity, Script } from 'playcanvas';

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

    // Set position, rotation, and scale
    if (opts.position) entity.setLocalPosition(opts.position);
    if (opts.rotation) entity.setLocalEulerAngles(opts.rotation);
    if (opts.scale) entity.setLocalScale(opts.scale);

    // Add sprites
    if (opts.sprites) {
        entity.addComponent('sprite');
    }

    // Add camera
    if (opts.camera) {
        entity.addComponent('camera', opts.camera);
    }

    // Add scripts
    if (opts.scripts) {
        const script = entity.addComponent('script');

        // If scripts is an array, create each script
        if(Array.isArray(opts.scripts)) {

            // Create each script
            opts.scripts.forEach(scriptClass => {

                // If the script is a class, create it
                if(scriptClass instanceof Script) {
                    script.create(script);
                } else if(script.class instanceof Script) {
                    script.create(script.class, script.options);
                }
            });
        }
    }

    // Add children
    if(opts.parent && opts.parent instanceof Entity) opts.parent.addChild(entity);

    return entity;

}