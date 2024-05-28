import { Entity, Sprite } from 'playcanvas';
import { Game } from './scripts/game.js';
import { Input } from './scripts/input.js';
import { Bird } from './scripts/bird.js';
import { createPipes } from './pipes.js';
import { Scroll } from './scripts/scroll.js';
import { createEntity } from './utils/entity-utils.js';
import { getAtlas } from './texture-atlas.js';

export const createGame = (app) => {

    const parent = app.root;
    const atlas = getAtlas(app);
    const layer = app.scene.layers.getLayerByName("Sprite").id;

    /**
     * Create the game entity
     */
    const game = createEntity('game', {
        scripts: [Game, Input],
        parent
    })

    /**
     * Create the background
     */
    createEntity('background', {
        sprite: {
            enabled: true,
            type: "simple",

            width: 1,
            height: 1,
            color: [1, 1, 1 ],
            opacity: 1,
            flipX: false,
            flipY: false,

            // spriteAsset: atlas,
            sprite: new Sprite(app.graphicsDevice, {
                "pixelsPerUnit": 100,
                "frameKeys": [
                    "20"
                ],
                "renderMode": 0,
                atlas
                // "textureAtlasAsset": 180945478,
            }),
            frame: 0,
            speed: 1,
            layers: [layer],
            drawOrder: 0,
          },
        parent: game,
    });

    /**
     * Create the bird entity
     */
    createEntity('bird', {
        sprite: {
            enabled: true,
            type: "animated",
            width: 1,
            height: 1,
            color: [1, 1, 1],
            opacity: 1,
            flipX: false,
            flipY: false,
            spriteAsset: atlas,
            frame: 0,
            speed: 1,
            batchGroupId: null,
            layers: [layer],
            drawOrder: 2,
            autoPlayClip: "Flap",
            clips: {
                0: {
                    name: "Flap",
                    fps: 10,
                    loop: true,
                    spriteAsset: 180924714
                }
            }
        },
        scripts: [
            { 
                class: Bird, 
                options: { flapVelocity: 1.55, gravity: 5, lowestHeight: -0.65, radius: 0.068 }
            }
        ],
        parent: game
    })

    /**
     * Create the Pipes Entity
     */
    createPipes(app)


    /**
     * Create the ground entity
     */ 
    createEntity('ground', {
        parent: game,
        sprites: true,
        scripts: [
            { 
                class: Scroll, 
                options: { startEvent: 'ground:start', stopEvent: 'ground:stop', resetEvent: 'ground:reset', cycleEvent: 'ground:cycle', startX: 0.035, endX: 0.035, speed: -0.01, frozen: false }
            }
        ],
        parent: game
    })

    return game;
}