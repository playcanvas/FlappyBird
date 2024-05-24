import { Entity } from 'playcanvas';
import { Scroll } from './scripts/scroll.js';
import { PipeHeight } from './scripts/pipe-height.js';
import { AddToScore } from './scripts/add-to-score.js';
import { createEntity } from './utils/entity-utils.js';

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

export const createPipes = (parent) => {


    const pipes = createEntity('pipes', {
        position: [1.7, 0.1, 0],
        scripts: [
            [Scroll, scrollDefaults], 
            PipeHeight
        ],
        parent,
    });

    createEntity('pipe1', {
        position: [-0.8, 0, 0],
        parent: pipes,
        scripts: [[ AddToScore, { bird: 'bird' }]],
        children: [
            createEntity('pipe top'),
            createEntity('pipe bottom')
        ]
    })

    createEntity('pipe2', {
        parent: pipes,
        scripts: [[ AddToScore, { bird: 'bird' }]],
        children: [
            createEntity('pipe top', { position: [0, -0.9, 0] }),
            createEntity('pipe bottom', { position: [0, 0.9, 0] })
        ]
    })

    createEntity('pipe3', {
        position: [0.8, 0, 0],
        parent: pipes,
        children: [
            createEntity('pipe top', { position: [0, -0.9, 0] }),
            createEntity('pipe bottom', { position: [0, 0.9, 0] })
        ]
    })

    return pipes;
}