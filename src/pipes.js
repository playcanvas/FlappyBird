import { SPRITETYPE_SIMPLE } from "playcanvas";
import { Scroll } from "/src/scripts/scroll.js";
import { PipeHeight } from "/src/scripts/pipe-height.js";
import { AddToScore } from "/src/scripts/add-to-score.js";
import { createEntity } from "/src/utils/entity-utils.js";
import { getAtlas } from "/src/texture-atlas.js";

const scrollDefaults = {
    startEvent: 'pipes:start', 
    stopEvent: 'pipes:stop',
    resetEvent: 'pipes:reset',
    cycleEvent: 'pipes:cycle',
    startX: 0.4,
    endX: -0.4,
    speed: -0.01,
    frozen: true
}

export const createPipes = async (app) => {

    const parent = app.root;
    const atlas = await getAtlas(app);
    const bird = app.root.findByName('Bird')
    const layers = [app.scene.layers.getLayerByName("Sprite").id];

    const spriteDefaults = {
        atlas, type: SPRITETYPE_SIMPLE, layers, drawOrder: 1
    }

    const pipeTopOpts = { 
        position: [0, 0.9, 0],
        tags: ['pipe'],
        sprite: {
            ...spriteDefaults,
            frameKeys: [ "29" ],
        }
    }

    const pipeBottomOpts = {
        position: [0, -0.9, 0],
        tags: ['pipe'],
        sprite: {
            ...spriteDefaults,
            frameKeys: [ "30" ]
        }
    }

    const pipe1 = createEntity('Pipe 1', {
        position: [-0.8, 0, 0],
        children: [
            createEntity('Pipe Top', pipeTopOpts ),
            createEntity('Pipe Bottom', pipeBottomOpts )
        ],
    })
    
    const pipe2 = createEntity('Pipe 2', {
        scripts: [{ class: AddToScore, options: { bird }}],
        children: [
            createEntity('Pipe Top', pipeTopOpts ),
            createEntity('Pipe Bottom', pipeBottomOpts )
        ],
    })
    
    const pipe3 = createEntity('Pipe 3', {
        position: [0.8, 0, 0],
        scripts: [{ class: AddToScore, options: { bird }}],
        children: [
            createEntity('Pipe Top', pipeTopOpts ),
            createEntity('Pipe Bottom', pipeBottomOpts )
        ],
    })

    const pipes = createEntity('Pipes', {
        position: [1.7, 0.1, 0],
        children: [pipe1, pipe2, pipe3],
        scripts: [
            { class: Scroll, options: scrollDefaults }, 
            { class: PipeHeight, options: { bird, pipe1, pipe2, pipe3 }}
        ],
        parent,
    });
    
    return pipes;
}