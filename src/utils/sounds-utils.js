/**
 * Load an individual sound from a URL
 * @param {string} url - The URL of the sound to load
 * @returns {Promise<id>} - The asset.id of loaded sound
 */
export const loadSound = (url, app) => {
    if(!app) throw new Error('App is required');
    return new Promise((resolve, reject) => {
        app.assets.loadFromUrl(url, 'audio', (err, asset) => {
            if(err) return reject(err);
            resolve(asset.id);
        });
    });
};

/**
 * Loads sounds from a map in the form of `{ name: url }` and return a map of `{ name: id }`
 * @param {Object<string, string>} soundMap - The map of sound URLs
 * @returns {Promise<string, number>} - The loaded sounds
 */
export const loadSoundMap = (soundUrlMap, app) => Promise.all(
    Object.entries(soundUrlMap)
        .map(([name, url]) => {
            return loadSound(url, app).then(id => ([name, id]));
        }));
