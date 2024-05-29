import { Script, Vec2, Vec3, Color, Material } from 'playcanvas'
import * as TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/23.1.2/tween.esm.js'
import { TweenOptions } from './tween-config.js'


export class Tween extends Script {

    /**
     * @attribute
     * @type {TweenOptions[]}
     */
    tweens;

    // initialize code called once per entity
    initialize () {
        var app = this.app;
        var i;

        this.tweenInstances = [];
        this.tweenCallbacks = [];

        var makeStartCallback = function (i) {  
            return function() {  
                this.start(i);
            };
        };

        for (i = 0; i < this.tweens.length; i++) {
            var tween = this.tweens[i];
            if (tween.autoPlay) {
                this.start(i);
            }
            if (tween.event?.length > 0) {
                this.tweenCallbacks[i] = {
                    event: tween.event,
                    cb: makeStartCallback(i)
                };
                app.on(this.tweenCallbacks[i].event, this.tweenCallbacks[i].cb, this);
            }
        }

        // Resume all paused tweens if the script is enabled
        this.on('enable', function () {
            for (i = 0; i < this.tweens.length; i++) {
                if (this.tweenInstances[i] && this.tweenInstances[i].isPaused()) {
                    if (this.tweenInstances[i].isPaused()) {
                        this.tweenInstances[i].resume();
                    }
                }
            }
        });

        // Pause all playing tweens if the script is disabled
        this.on('disable', function () {
            for (i = 0; i < this.tweens.length; i++) {
                if (this.tweenInstances[i]) {
                    if (this.tweenInstances[i].isPlaying()) {
                        this.tweenInstances[i].pause();
                    }
                }
            }
        });

        this.on('attr', function (name, value, prev) {
            for (i = 0; i < this.tweenCallbacks.length; i++) {
                if (this.tweenCallbacks[i]) {
                    app.off(this.tweenCallbacks[i].event, this.tweenCallbacks[i].cb, this);
                    this.tweenCallbacks[i] = null;
                }
            }

            for (i = 0; i < this.tweens.length; i++) {
                var tween = this.tweens[i];
                if (tween.event.length > 0) {
                    this.tweenCallbacks[i] = {
                        event: tween.event,
                        cb: makeStartCallback(i)
                    };
                    app.on(this.tweenCallbacks[i].event, this.tweenCallbacks[i].cb, this);
                }
            }
        });
    }

    start(idx) {
        var app = this.app;
        var tween = this.tweens[idx];

        var easingTypes = [ 'In', 'Out', 'InOut' ];
        var easingFuncs = [ 'Linear', 'Quadratic', 'Cubic', 'Quartic', 'Quintic', 'Sinusoidal', 'Exponential', 'Circular', 'Elastic', 'Back', 'Bounce'];

        var easingFunc;
        if (tween.easingFunction === 0) {
            easingFunc = TWEEN.Easing[easingFuncs[tween.easingFunction]].None;
        } else {
            easingFunc = TWEEN.Easing[easingFuncs[tween.easingFunction]][easingTypes[tween.easingType]];
        }

        var tweenInstances = this.tweenInstances;
        if (tweenInstances[idx]) {
            tweenInstances[idx].stop();
        }

        var pathSegments = tween.path.split('.');
        var propertyOwner = this.entity;
        for (let i = 0; i < pathSegments.length - 1; i++) {
            propertyOwner = propertyOwner[pathSegments[i]];
        }

        var propertyName = pathSegments[pathSegments.length - 1];
        var property = propertyOwner[propertyName];

        var startValue, endValue;
        var isNumber = typeof property === 'number';
        var start = tween.start;
        var end = tween.end;
        if (isNumber) {
            startValue = { x: start.x };
            endValue = { x: end.x };
        } else if (property instanceof Vec2) {
            startValue = new Vec2(start.x, start.y);
            endValue = new Vec2(end.x, end.y);
        } else if (property instanceof Vec3) {
            startValue = new Vec3(start.x, start.y, start.z);
            endValue = new Vec3(end.x, end.y, end.z);
        } else if (property instanceof Vec4) {
            startValue = start.clone();
            endValue = end.clone();
        } else if (property instanceof Color) {
            startValue = new Color(start.x, start.y, start.z, start.w);
            endValue = new Color(end.x, end.y, end.z, end.w);
        } else {
            console.error('ERROR: tween - specified property must be a number, vec2, vec3, vec4 or color');
            return;
        }

        var updateProperty = function (value) {
            // Update the tweened property. Transformation functions are special-cased here.
            switch (propertyName) {
                case 'eulerAngles':
                    propertyOwner.setEulerAngles(value);
                    break;
                case 'localEulerAngles':
                    propertyOwner.setLocalEulerAngles(value);
                    break;
                case 'localPosition':
                    propertyOwner.setLocalPosition(value);
                    break;
                case 'localScale':
                    propertyOwner.setLocalScale(value);
                    break;
                case 'position':
                    propertyOwner.setPosition(value);
                    break;
                default:
                    propertyOwner[propertyName] = isNumber ? value.x : value;

                    if (propertyOwner instanceof Material) {
                        propertyOwner.update();
                    }
                    break;
            }
        };

        updateProperty(startValue);

        tweenInstances[idx] = new TWEEN.Tween(startValue)
            .to(endValue, tween.duration)
            .easing(easingFunc)
            .onStart(function (obj) {
                if (tween.startEvent !== '') {
                    app.fire(tween.startEvent);
                }
            })
            .onStop(function (obj) {
                if (tween.stopEvent !== '') {
                    app.fire(tween.stopEvent);
                }
                tweenInstances[idx] = null;
            })
            .onUpdate(function (obj) {
                updateProperty(obj);

                if (tween.updateEvent !== '') {
                    app.fire(tween.updateEvent);
                }
            })
            .onComplete(function (obj) {
                if (tween.completeEvent !== '') {
                    app.fire(tween.completeEvent);
                }
                tweenInstances[idx] = null;
            })
            .onRepeat(function (obj) {
                if (tween.repeatEvent !== '') {
                    app.fire(tween.repeatEvent);
                }
            })
            .repeat(tween.repeat === -1 ? Infinity : tween.repeat)
            .repeatDelay(tween.repeatDelay)
            .yoyo(tween.yoyo)
            .delay(tween.delay)
            .start();
    }


}

// We have to update the tween.js engine somewhere once a frame...
// var app = pc.Application.getApplication();
// if (app) {
//     app.on('update', function (dt) {
//         TWEEN.update();
//     });
// }



