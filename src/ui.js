import { Entity, Vec4 } from "playcanvas";
import { Tween } from "./scripts/tween.js";
import { EasingType, Easing } from "./scripts/tween-config.js";
import { Button } from "./scripts/button.js";
import { Score } from "./scripts/score.js";
import { Enable } from "./scripts/enable.js";
import { Scoreboard } from "./scripts/scoreboard.js";
import { createMedal } from "./medal.js";
import { createEntity } from "./utils/entity-utils.js";

/**
 * Create the Game UI
 * @returns {Entity}
 */
export const createUI = (parent) => {

    const ui = createEntity('ui', { parent });

    {
        /**
         * Create the menu screen entity
         */
        const menuScreen = createEntity('menu screen', { parent: ui });
        // const menuScreen = new Entity('Menu Screen');
        // ui.addChild(menuScreen);

        /**
         * Create the logo entity
         */
        const logo = createEntity('logo', {
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
        createEntity('flappy bird', { 
            sprites: true, 
            parent: logo,
            position: [-0.1, 0.35, 0]
        });

        /**
         * Create the Bird entity
         */
        createEntity('bird', { 
            sprites: true, 
            parent: logo,
            position: [-0.535, 0.365, 0]
         });

        /**
         * Create the Start button entity
         */
        createEntity('start button', {
            position: [-0.31, -0.583, 0],
            scripts: [{ 
                class: Button, 
                options: { displacement: 0.0039063, event: 'game:getready' }
            }],
            parent: menuScreen
        });

        /**
         * Create the Score button
         */
        createEntity('score button', { sprites: true, parent: menuScreen, position: [0.31, -0.583, 0] });

        /**
         * Create the Rate button
         */
        createEntity('Rate button', { sprites: true, parent: menuScreen, position: [0.31, -0.411, 0]});

        /**
         * Create the Copyright text
         */
        createEntity('Copyright', { sprites: true, parent: menuScreen, position: [0, -0.84, 0]});

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
            position: [0.53, 0.84, 0],
            sprites: true,
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
            position: [0.53, 0.84, 0],
            sprites: true,
            scripts: [{
                class: Button,
                options: { displacement: 0.0039063, event: 'game:unpause' }
            }],
            parent: gameScreen
        });
        // const playButton = new Entity('Play Button');
        // playButton.enabled = false;
        // playButton.addComponent('sprite');
        // playButton.addComponent('script').create(Button, {
        //     displacement: 0.0039063,
        //     event: 'game:unpause'
        // });
        // gameScreen.addChild(playButton);

        /**
         * Create the Score text
         */
        const score = new Entity('Score');
        score.enabled = false;
        const display = [
            new Entity('Digit 0'),
            new Entity('Digit 1'),
            new Entity('Digit 2'),
            new Entity('Digit 3'),
        ].forEach(child => score.addChild(child))

        const numbers = [
            // new Entity('Digit 0'),
            // new Entity('Digit 1'),
            // new Entity('Digit 2'),
            // new Entity('Digit 3'),
        ]

        score.addComponent('script').create(Score, {
            name: 'score',
            display,
            numbers
        });
        gameScreen.addChild(score);

        /**
         * Create the Get Ready text
         */
        const getReady = new Entity('Get Ready');
        getReady.enabled = false;
        getReady.addComponent('sprite');
        getReady.addComponent('script')
        getReady.script.create(Tween, {
            tweens: [
                {
                    autoPlay: true,
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
                }
            ]
        });
        getReady.script.create(Enable, {
            enableEvent: 'game:getready',
            disableEvent: 'disable:getready'
        })
        gameScreen.addChild(getReady);

        /**
         * Create the Tap text
         */
        const tap = new Entity('Tap');
        tap.enabled = false;
        tap.addComponent('sprite');
        tap.addComponent('script')
        tap.script.create(Tween, {
            tweens: [
                {
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
                    repeatEvent: 'disable:tap'
                }
            ]
        });
        tap.script.create(Enable, {
            enableEvent: 'disable:getready',
            disableEvent: 'disable:tap'
        });

    }

    /**
     * Create the Game Over Screen
     */
    const gameOverScreen = new Entity('Game Over Screen');
    gameOverScreen.enabled = false;

    {
        /**
         * Create the Game Over text
         */
        const gameOver = new Entity('Game Over');
        gameOver.addComponent('sprite');
        gameOver.addComponent('script').create(Tween, {
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
        });
        gameOverScreen.addChild(gameOver);

        /**
         * Create the Ok button
         */
        const okButton = new Entity('Ok Button');
        okButton.enabled = false;
        okButton.addComponent('script').create(Button, {
            displacement: 0.0039063,
            event: 'game:menu'
        });
        okButton.addComponent('sprite');
        gameOverScreen.addChild(okButton);

        /**
         * Create the Share button
         */
        const shareButton = new Entity('Share Button');
        shareButton.enabled = false;
        shareButton.addComponent('script').create(Button, {
            displacement: 0.0039063,
            event: 'game:share'
        });
        shareButton.addComponent('sprite');
        gameOverScreen.addChild(shareButton);

        /**
         * Create the Scoreboard
         */
        const scoreboard = new Entity('Scoreboard');
        scoreboard.enabled = false;
        scoreboard.addComponent('sprite');
        scoreboard.addComponent('script')
        scoreboard.script.create(Scoreboard);
        scoreboard.script.create(Tween, {
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
        });
        gameOverScreen.addChild(scoreboard);

        {
            /**
             * Create the Medal
             */
            const medal = createMedal();
            medal.enabled = false;
            scoreboard.addChild(medal);

            /**
             * Create the Current Score
             */
            const score = new Entity('Current Score');
            score.addComponent('sprite');
            score.addComponent('script').create(Score, {
                name: 'score',
                display: [
                    score.addChild(new Entity('Digit 0')),
                    score.addChild(new Entity('Digit 1')),
                    score.addChild(new Entity('Digit 2')),
                    score.addChild(new Entity('Digit 3')),
                ],
                numbers: []
            });
            scoreboard.addChild(score);

            /**
             * Create the New text
             */
            const newScore = new Entity('New');
            newScore.enabled = false;
            newScore.addComponent('sprite');
            scoreboard.addChild(newScore);

            /**
             * Create the Best Score
             */
            const bestScore = new Entity('Best Score');

            bestScore.addComponent('sprite');
            bestScore.addComponent('script').create(Score, {
                name: 'score',
                display: [
                    bestScore.addChild(new Entity('Digit 0')),
                    bestScore.addChild(new Entity('Digit 1')),
                    bestScore.addChild(new Entity('Digit 2')),
                    bestScore.addChild(new Entity('Digit 3')),
                ],
                numbers: []
            });
            scoreboard.addChild(bestScore);

        }
    }

    return ui;
}