import { Entity } from "playcanvas";
import { Sparkle } from "./scripts/sparkle.js";
import { createEntity } from "./utils/entity-utils.js";
import { getAtlas } from "./texture-atlas.js";

export const createMedal = async (app) => {

    const atlas = await getAtlas(app);
    const layers = [app.scene.layers.getLayerByName("Sprite").id];

    const sparkle = createEntity('sparkle', { 
        // sprite: true,
        sprite: {
            frameKeys: [ "3" ],
            atlas,
            layers,
            drawOrder: 6,
            clips: {
                0: { name: "Sparkle", fps: 10, loop: true, }
            }
   
        },
        scripts: [{ class: Sparkle, options: { radius: 0.1 } }]
     });

    return createEntity('medal', {
        children: [sparkle],
    });
}