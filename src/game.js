import { Entity } from 'playcanvas';
import { Game } from './scripts/game.js';
import { Input } from './scripts/input.js';
import { Bird } from './scripts/bird.js';
import { createPipes } from './pipes.js';
import { Scroll } from './scripts/scroll.js';
import { createEntity } from './utils/entity-utils.js';

export const createGame = (parent) => {

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
        sprites: true,
        parent: game
    });

    /**
     * Create the Pipes Entity
     */
    createPipes()

    /**
     * Create the bird entity
     */
    createEntity('bird', {
        sprites: true,
        scripts: [
            { 
                class: Bird, 
                options: { flapVelocity: 1.55, gravity: 5, lowestHeight: -0.65, radius: 0.068 }
            }
        ],
        parent: game
    })

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