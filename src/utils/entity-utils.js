import { Entity, Sprite, Vec3, Application } from 'playcanvas';

const SCRIPT_DEFAULTS = { preloading: false };
const toLowerCamelCase = (str) => str[0].toLowerCase() + str.slice(1);

/**
 * @typedef {Object} EntityOptions
 * @property {boolean} sprites - Whether to add a sprite component.
 * @property {boolean | pc.Script[]} scripts - Whether to add a script component, or an array of script classes.
 * @property {Entity} parent - The parent entity.
 */

/**
 * Convenience function to create an entity with various components.
 * 
 * @param {string} name - The name of the entity.
 * @param {EntityOptions} opts - The options for the entity.
 * @returns 
 */
export const createEntity = (name, opts = {}) => {

    const entity = new Entity(name);
    const app = Application.getApplication();

    // Add to parent, and add any children
    if(opts.parent && opts.parent instanceof Entity) opts.parent.addChild(entity);
    if(opts.children && Array.isArray(opts.children)) {
        opts.children.forEach(child => entity.addChild(child));    
    }

    // Set position, rotation, and scale
    if (opts.position) entity.setLocalPosition(new Vec3(opts.position));
    if (opts.rotation) entity.setLocalEulerAngles(new Vec3(opts.rotation));
    if (opts.scale) entity.setLocalScale(new Vec3(opts.scale));
    if (opts.enabled !== undefined) entity.enabled = opts.enabled
    if (opts.tags && Array.isArray(opts.tags)) opts.tags.forEach(tag => entity.tags.add(tag));


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
        opts.sounds.forEach((asset, key) => {
            sound.addSlot(key, { asset }).load();
        });
        
    }

    // Add scripts
    if (opts.scripts) {
        const component = entity.addComponent('script');

        // If scripts is an array, create each script
        if(Array.isArray(opts.scripts)) {

            
            // Create each script
            opts.scripts.forEach(script => {

                // If script is a class, create an instance
                const scriptName = toLowerCamelCase(script.class?.name ?? script.name);
                
                // When the script is created, initialize it with the necessary attributes
                component.on(`create:${scriptName}`, scriptInstance => {
                    // If attributes exist assign them to the instance
                    const attributes = script.options || {};
                    Object.assign(scriptInstance, attributes);
                });
                
                // Create the script
                component.create(script.class ?? script, SCRIPT_DEFAULTS);

            });
        }
    }

    return entity;

}