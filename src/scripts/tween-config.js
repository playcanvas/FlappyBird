/** @enum {number} */
export const Easing = {
    Linear: 0,
    Quadratic: 1,
    Cubic: 2,
    Quartic: 3,
    Quintic: 4,
    Sinusoidal: 5,
    Exponential: 6,
    Circular: 7,
    Elastic: 8,
    Back: 9,
    Bounce: 1
}

/** @enum {number} */
export const EasingType = {
    In: 0,
    Out: 1,
    InOut: 2
}

/** @interface */
export class TweenOptions {
    /**
     * Play tween immediately.
     */
    autoPlay = false

    /**
     * Play tween on the specified event name. This event must be fired on the global application object (e.g. this.app.fire(\'eventname\');).
     * @type {string}
     */
    event
    
    /**
     * The path from the entity to the property. e.g. \'light.color\', \'camera.fov\' or \'script.vehicle.speed\'.
     * @type {string}
     */
    path
    
    /**
     * @type {pc.Vec4}
     */
    start
    
    /**
     * @type {pc.Vec4}
     */
    end
    
    /**
     * The easing functions: Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce.
     * @type {Easing}
     */
    easingFunction = 0
    
    /**
     * Whether to ease in, easy out or ease in and then out using the specified easing function. Note that for a Linear easing function, the easing type is ignored.
     * @type {EasingType}
     */
    easingType = 0
    
    /**
     * Time to wait in milliseconds after receiving the trigger event before executing the tween. Defaults to 0.
     */
    delay = 0
    
    /**
     * Time to execute the tween in milliseconds. Defaults to 1000.
     */
    duration = 1000
    
    /**
     * The number of times the tween should be repeated after the initial playback. -1 will repeat forever. Defaults to 0.
     */
    repeat = 0
    
    /**
     * Time to wait in milliseconds before executing each repeat of the tween. Defaults to 0.
     */
    repeatDelay = 0
    
    /**
     * This function only has effect if used along with repeat. When active, the behaviour of the tween will be like a yoyo, i.e. it will bounce to and from the start and end values, instead of just repeating the same sequence from the beginning. Defaults to false.
     */
    yoyo = false
    
    /**
     * Executed right before the tween starts animating, after any delay time specified by the delay method. This will be executed only once per tween, i.e. it will not be run when the tween is repeated via repeat(). It is great for synchronising to other events or triggering actions you want to happen when a tween starts.
     * @type {string}
     */
    startEvent
    
    /**
     * Executed when a tween is explicitly stopped via stop(), but not when it is completed normally.
     * @type {string}
     */
    stopEvent
    
    /**
     * Executed each time the tween is updated, after the values have been actually updated.
     * @type {string}
     */
    updateEvent
    
    /**
     * Executed when a tween is finished normally (i.e. not stopped).
     * @type {string}
     */
    completeEvent
    
    /**
     * Executed whenever a tween has just finished one repetition and will begin another.
     * @type {string}
     */
    repeatEvent
    
}