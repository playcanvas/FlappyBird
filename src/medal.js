import { Entity } from "playcanvas";
import { Sparkle } from "./scripts/sparkle.js";
import { createEntity } from "./utils/entity-utils.js";

export const createMedal = (parent) => {

    const sparkle = createEntity('sparkle', { 
        sprites: true,
        scripts: [{ class: Sparkle, options: { radius: 0.1 } }]
     });

    return createEntity('medal', {
        sprites: true,
        children: [sparkle],
        parent
    });
}