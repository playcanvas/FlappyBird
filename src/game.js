import { Entity, Sprite, SPRITETYPE_SIMPLE, SPRITETYPE_ANIMATED } from 'playcanvas';
import { Game } from './scripts/game.js';
import { Input } from './scripts/input.js';
import { Bird } from './scripts/bird.js';
import { createPipes } from './pipes.js';
import { Scroll } from './scripts/scroll.js';
import { createEntity } from './utils/entity-utils.js';
import { getAtlas } from './texture-atlas.js';
import { loadSoundMap } from './utils/sounds-utils.js';

export const createGame = async (app) => {

    const parent = app.root;
    const atlas = await getAtlas(app);
    const layers = [app.scene.layers.getLayerByName("Sprite").id];

    const soundMap = await loadSoundMap({
        Point: '/audio/sfx_point.mp3',
        Swoosh: '/audio/sfx_swooshing.mp3',
        Flap: '/audio/sfx_wing.mp3',
        Hit: '/audio/sfx_hit.mp3',
        Die: '/audio/sfx_die.mp3'
    }, app);
      
    const sounds = new Map(soundMap);

    /**
     * Create the game entity
     */
    const game = createEntity('Game', {
        scripts: [Game, Input],
        sounds,
        parent
    })

    /**
     * Create the background
     */
    createEntity('Background', {
        sprite: {
            frameKeys: [ "1" ],
            atlas,
            layers,
            drawOrder: 0
        },
        parent: game,
    });

    /**
     * Create the bird entity
     */
    createEntity('Bird', {
        position: [-0.3, 0.16, 0],
        enabled: false,
        sprite: {
            frameKeys: [ "26", "27", "28", "27" ],
            atlas,

            type: SPRITETYPE_ANIMATED,
            layers,
            drawOrder: 2,
            autoPlayClip: "Flap",
            clips: {
                0: { name: "Flap", fps: 10, loop: true, }
            }
        },
        scripts: [{ 
            class: Bird, 
            options: { flapVelocity: 1.55, gravity: 5, lowestHeight: -0.65, radius: 0.068 }
        }],
        parent: game
    })

    /**
     * Create the Pipes Entity
     */
    const pipes = await createPipes(app)
    game.addChild(pipes);


    /**
     * Create the ground entity
     */ 
    createEntity('Ground', {
        parent: game,
        position: [0, -1, 0],
        sprite: {
            frameKeys: [ "2" ],
            atlas,
            layers,
            drawOrder: 3
        },
        scripts: [{ 
            class: Scroll, 
            options: { 
                startEvent: 'ground:start', 
                stopEvent: 'ground:stop', 
                resetEvent: 'ground:reset', 
                cycleEvent: 'ground:cycle', 
                startX: 0.035, 
                endX: -0.035, 
                speed: -0.01, 
                frozen: false 
            }
        }],
        parent: game
    })

    return game;
}