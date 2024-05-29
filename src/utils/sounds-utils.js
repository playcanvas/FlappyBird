import { Sound } from "playcanvas";

const audioContext = new (globalThis.AudioContext || globalThis.webkitAudioContext)();

/**
 * Load a sound from a URL
 * @param {string} url - The URL of the sound to load
 * @returns {Promise<Sound>} - The loaded sound
 */
export const loadSound = url => fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => new Sound(audioBuffer));

/** 
 * @typedef {Object} SoundUrlMap
 * @property {string} - The URL of the sound
 * 
 */

/**
 * Load a map of sounds from a map of URLs in the form of `{ id: url }` and return a map of `{ id: Sound }`
 * @param {Object<string, string>} soundMap - The map of sound URLs
 * @returns {Promise<string, Sound>} - The loaded sounds
 */
export const loadSoundMap = soundUrlMap => Promise.all(
    Object.entries(soundUrlMap)
        .map(([id, url]) => {
            return loadSound(url).then(sound => [id, sound]);
        })
);
