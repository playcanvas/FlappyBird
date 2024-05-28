import { Entity } from "playcanvas";
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

export const createPipes = (app) => {

    const parent = app.root;
    const atlas = getAtlas(app);
    const bird = app.root.findByName('bird')

    const pipes = createEntity('pipes', {
        position: [1.7, 0.1, 0],
        scripts: [
            { class: Scroll, options: scrollDefaults}, 
            PipeHeight
        ],
        parent,
    });

    createEntity('Pipe 1', {
        position: [-0.8, 0, 0],
        parent: pipes,
        scripts: [{ class: AddToScore, options: { bird }}],
        children: [
            createEntity('pipe top'),
            createEntity('pipe bottom')
        ]
    })

    createEntity('Pipe 2', {
        parent: pipes,
        scripts: [{ class: AddToScore, options: { bird }}],
        children: [
            createEntity('pipe top', { position: [0, -0.9, 0] }),
            createEntity('pipe bottom', { position: [0, 0.9, 0] })
        ]
    })

    createEntity('Pipe 3', {
        position: [0.8, 0, 0],
        parent: pipes,
        children: [
            createEntity('pipe top', { position: [0, -0.9, 0] }),
            createEntity('pipe bottom', { position: [0, 0.9, 0] })
        ]
    })

    return pipes;
}