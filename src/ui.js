import { Entity, Vec4, SPRITETYPE_ANIMATED, Sprite } from "playcanvas";
import { Tween } from "./scripts/tween.js";
import { EasingType, Easing } from "./scripts/tween-config.js";
import { Button } from "./scripts/button.js";
import { Score } from "./scripts/score.js";
import { Enable } from "./scripts/enable.js";
import { Scoreboard } from "./scripts/scoreboard.js";
import { createMedal } from "./medal.js";
import { createEntity } from "./utils/entity-utils.js";
import { getAtlas } from "./texture-atlas.js";

/**
 * Create the Game UI
 * @returns {Entity}
 */
export const createUI = async (app) => {

    const parent = app.root;
    const atlas = await getAtlas(app);
    const layers = [app.scene.layers.getLayerByName("Sprite").id];

    // Create an array of numerical Sprites 0-9
    const numbers = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
            .map(key => new Sprite( app.graphicsDevice, { pixelsPerUnit: 100, frameKeys: [key], atlas, layers }));

    const ui = createEntity('ui', { parent });

    {
        /**
         * Create the menu screen entity
         */
        const menuScreen = createEntity('Menu Screen', { parent: ui });

        /**
         * Create the logo entity
         */
        const logo = createEntity('Logo', {
            scripts: [{ 
                class: Tween,
                options: {
                    tweens: [
                        {
                            autoPlay: true,
                            path: 'localPosition',
                            start: new Vec4(0, 0.02),
                            end: new Vec4(0, -0.02),
                            easingFunction: Easing.Sinusoidal,
                            easingType: EasingType.InOut,
                            duration: 500,
                            repeat: -1,
                            yoyo: true
                        }
                    ]
                }
            }],
            parent: menuScreen
        })

        /**
         * Create the Flappy Bird text entity
         */
        createEntity('Flappy Bird', { 
            sprite: {
                frameKeys: [ "4" ],
                atlas,
                layers,
                drawOrder: 4,
                autoPlayClip: "Flap",
                clips: {
                    0: { name: "Flap", fps: 10, loop: true, }
                }
            },
            parent: logo,
            position: [-0.1, 0.35, 0]
        });

        /**
         * Create the Bird entity
         */
        createEntity('Bird', { 
            sprite: {
                frameKeys: [ "26", "27", "28", "27" ],
                atlas,
    
                type: SPRITETYPE_ANIMATED,
                layers,
                drawOrder: 4,
                autoPlayClip: "Flap",
                clips: {
                    0: { name: "Flap", fps: 10, loop: true, }
                }
            },
            parent: logo,
            position: [0.525, 0.365, 0]
         });

        /**
         * Create the Start button
         */
        createEntity('Start Button', {
            position: [-0.31, -0.583, 0],
            sprite: {
                frameKeys: [ "17" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{ 
                class: Button, 
                options: { displacement: 0.0039063, event: 'game:getready' }
            }],
            parent: menuScreen
        });

        /**
         * Create the Score button
         */
        createEntity('Score Button', { 
            position: [0.31, -0.583, 0],
            sprite: {
                frameKeys: [ "15" ],
                atlas,
                layers,
                drawOrder: 4
            },
            parent: menuScreen
        });

        /**
         * Create the Rate button
         */
        createEntity('Rate Button', { 
            enabled: false,
            position: [0.31, -0.411, 0],
            sprite: {
                frameKeys: [ "14" ],
                atlas,
                layers,
                drawOrder: 4
            },
            parent: menuScreen
        });

        /**
         * Create the Copyright text
         */
        createEntity('Copyright', { 
            sprite: {
                frameKeys: [ "38" ],
                atlas,
                layers,
                drawOrder: 4
            },
            parent: menuScreen, position: [0, -0.84, 0]});

    }

    /**
     * Create the Game Screen
     */
    const gameScreen = new Entity('Game Screen');
    gameScreen.enabled = false;
    ui.addChild(gameScreen);

    {
        /**
         * Create the Pause button
         */
        createEntity('Pause Button', {
            position: [-0.53, 0.84, 0],
            sprite: {
                frameKeys: [ "18" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{
                class: Button,
                options: { displacement: 0.0039063, event: 'game:pause' }
            }],
            parent: gameScreen
        });

        /**
         * Create the Play button
         */
        createEntity('Play Button', {
            enabled: false,
            position: [-0.53, 0.84, 0],
            sprite: {
                frameKeys: [ "19" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{
                class: Button,
                options: { displacement: 0.0039063, event: 'game:unpause' }
            }],
            parent: gameScreen
        });

        /**
         * Create the Score text
         */
        const display = [
            createEntity('Digit 0', { sprite: { layers }, position: [-0.24, 0, 0] }),
            createEntity('Digit 1', { sprite: { layers }, position: [-0.16, 0, 0] }),
            createEntity('Digit 2', { sprite: { layers }, position: [-0.08, 0, 0] }),
            createEntity('Digit 3', { sprite: { layers }, position: [0, 0, 0] }),
        ]

        createEntity('Score', {
            position: [0, 0.86, 0],
            scripts: [{
                class: Score,
                options: {
                    name: 'score',
                    display,
                    numbers
                }
            }],
            children: display,
            parent: gameScreen
        });


        /**
         * Create the Get Ready text
         */
        createEntity('Get Ready', {
            sprite: {
                frameKeys: [ "6" ], atlas, layers, drawOrder: 4
            },
            scripts: [{
                class: Tween,
                options: {
                    tweens: [
                        {
                            autoPlay: false,
                            event: 'ui:fadegetready',
                            path: 'sprite.opacity',
                            start: new Vec4(1),
                            end: new Vec4(0),
                            easingFunction: Easing.Linear,
                            easingType: EasingType.Out,
                            delay: 0,
                            duration: 250,
                            repeat: 1,
                            repeatDelay: 0,
                            yoyo: true,
                            repeatEvent: 'disable:getready'
                        }
                    ]
                }
            }, 
            {
                class: Enable,
                options: {
                    enableEvent: 'game:getready',
                    disableEvent: 'disable:getready'
                }
            }],
            parent: gameScreen
        });

        /**
         * Create the Tap text
         */
        createEntity('Tap', {
            sprite: {
                frameKeys: [ "31" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [
                {
                    class: Tween,
                    options: {
                        tweens: [{
                            autoPlay: false,
                            event: 'ui:fadegetready',
                            path: 'sprite.opacity',
                            start: new Vec4(1),
                            end: new Vec4(0),
                            easingFunction: Easing.Linear,
                            easingType: EasingType.Out,
                            duration: 250,
                            repeat: 1,
                            yoyo: true,
                            repeatEvent: 'disable:getready'
                        }]
                    }
                }, 
                {
                    class: Enable,
                    options: {
                        enableEvent: 'game:getready',
                        disableEvent: 'disable:getready'
                    }
                }
            ],
            parent: gameScreen
        });

    }

    /**
     * Create the Game Over Screen
     */
    const gameOverScreen = createEntity('Game Over Screen', {
        parent: ui,
        enabled: false
    });

    {
        /**
         * Create the Game Over text
         */
        createEntity('Game Over', {
            position: [0, 0.522, 0],
            sprite: {
                frameKeys: [ "5" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{
                class: Tween, 
                options: { 
                    tweens: [
                        {
                            autoPlay: false,
                            event: 'ui:fadeingameover',
                            path: 'localPosition',
                            start: new Vec4(0, 0.5),
                            end: new Vec4(0, 0.42),
                            easingFunction: Easing.Back,
                            easingType: EasingType.In,
                            delay: 500,
                            duration: 300,
                            repeat: 0,
                            yoyo: false
                        },
                        {
                            autoPlay: false,
                            event: 'ui:fadeingameover',
                            path: 'sprite.opacity',
                            start: new Vec4(0),
                            end: new Vec4(1),
                            easingFunction: Easing.Back,
                            easingType: EasingType.In,
                            delay: 500,
                            duration: 300,
                            repeat: 0,
                            yoyo: false
                        
                        }
                    ]
                }
            }],
        });

        /**
         * Create the Ok button
         */
        createEntity('OK Button', {
            position: [-0.31, -0.583, 0],
            sprite: {
                frameKeys: [ "13" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{
                class: Button,
                options: { displacement: 0.0039063, event: 'game:menu' }
            }],
            parent: gameOverScreen
        });

        /**
         * Create the Share button
         */
        createEntity('Share Button', {
            position: [0.31, -0.583, 0],
            sprite: {
                frameKeys: [ "16" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [{
                class: Button,
                options: { displacement: 0.0039063, event: 'game:share' }
            }],
            parent: gameOverScreen
        });

        /**
         * Create the Scoreboard
         */
        const scoreboard = createEntity('Scoreboard', {
            sprite: {
                frameKeys: [ "3" ],
                atlas,
                layers,
                drawOrder: 4
            },
            scripts: [
                Scoreboard, 
                {
                    class: Tween,
                    options: {
                        tweens: [
                            {
                                autoPlay: false,
                                event: 'ui:showscoreboard',
                                path: 'localPosition',
                                start: new Vec4(0, -1.7),
                                end: new Vec4(0, 0.02),
                                easingFunction: Easing.Quintic,
                                easingType: EasingType.Out,
                                delay: 1250,
                                duration: 500,
                                repeat: 0,
                                yoyo: false
                            }
                        ]
                    }
                }
            ],
            parent: gameOverScreen
        });

        {
            /**
             * Create the Medal
             */
            createEntity('Medal', {
                enabled: false,
                // sprites: true,
                children: [await createMedal(app)],
                parent: scoreboard
            });


            /**
             * Create the Current Score
             */

            const display = [
                createEntity('Digit 0', { sprite: { layers }, position: [-0.24, 0, 0] }),
                createEntity('Digit 1', { sprite: { layers }, position: [-0.16, 0, 0] }),
                createEntity('Digit 2', { sprite: { layers }, position: [-0.08, 0, 0] }),
                createEntity('Digit 3', { sprite: { layers }, position: [0, 0, 0] }),
            ]
    
            createEntity('Current Score', {
                scripts: [{
                    class: Score,
                    options: {
                        name: 'score',
                        display,
                        numbers
                    }
                }],
                parent: scoreboard
            });


            /**
             * Create the New text
             */
            createEntity('New', {
                enabled: false,
                sprite: {
                    frameKeys: [ "7" ],
                    atlas,
                    layers,
                },
                parent: scoreboard
            });

            /**
             * Create the Best Score
             */
            createEntity('Best Score', {
                scripts: [{
                    class: Score,
                    options: {
                        name: 'score',
                        display,
                        numbers
                    }
                }],
                parent: scoreboard
            });

        }
    }

    return ui;
}