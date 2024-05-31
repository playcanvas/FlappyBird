![Flappy Bird](/public/images/gh-header.png)

**An engine only port of the popular game Flappy Bird made using in [PlayCanvas](https://github.com/playcanvas/engine) with extra [PWA](https://web.dev/explore/progressive-web-apps) goodness.**

It's an installable, engine only, editor-less, pure code example of using PlayCanvas for a game. Most of the setup code can be found in the [game](./src/game.js) and [ui](./src/ui.js). All the gmaez logic is using ESM Scripts found in the [scripts](./src/scripts/) dir.

Features

 - **PlayCanvas Engine:** Utilizes the powerful and flexible PlayCanvas engine for rendering and game logic.
 - **Progressive Web App (PWA):** Enhanced with PWA features for offline capabilities and installability.
 - **Pure Code:** No editor needed, all game logic and setup are handled through code.\
 - **Installable:** Can be installed on devices for a native-like experience.
 - **Modular Codebase:** Organized code in separate modules for game logic and UI, making it easy to understand and extend.

### Getting started

Clone this repository then 

```bash
npm install
npm run dev
````

### Building for production

To build the project for production, run:

```bash
npm run build
```

### Deployment

You can deploy the contents of the dist directory to any static site hosting service such as Vercel, Netlify, or GitHub Pages.

❤️🐦
