import { TextureAtlasHandler, FILTER_NEAREST, TextureAtlas, Vec4, Vec2, Texture, FILTER_LINEAR } from 'playcanvas';

let atlas;

const ATLAS_URL = '/images/spritesheet.png';
const ATLAS_DATA = {
  width: 453,
  height: 256,
}

const atlasOpts = {
  "addressu": "clamp",
  "addressv": "clamp",
  "minfilter": "nearest_mip_nearest",
  "magfilter": "nearest",
  "anisotropy": 1,
  "rgbm": false,
  "mipmaps": true,
  "frames": {
    "1": {
      name: "Background",
      rect: new Vec4(0, 0, 144, 256),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "2": {
      name: "Ground",
      rect: new Vec4(146, 200, 154, 56),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "3": {
      name: "Scoreboard",
      rect: new Vec4(146, 140, 113, 58),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "4": {
      name: "Flappy Bird",
      rect: new Vec4(146, 61, 96, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "5": {
      name: "Game Over",
      rect: new Vec4(146, 38, 94, 19),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "6": {
      name: "Get Ready",
      rect: new Vec4(146, 13, 87, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "7": {
      name: "New",
      rect: new Vec4(146, 4, 16, 7),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "8": {
      name: "Big 6",
      rect: new Vec4(165, 1, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "9": {
      name: "Big 7",
      rect: new Vec4(175, 1, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "10": {
      name: "Big 8",
      rect: new Vec4(185, 1, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "11": {
      name: "Big 9",
      rect: new Vec4(195, 1, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "12": {
      name: "Menu",
      rect: new Vec4(246, 124, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "13": {
      name: "OK",
      rect: new Vec4(246, 108, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "14": {
      name: "Rate",
      rect: new Vec4(246, 92, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "15": {
      name: "Score",
      rect: new Vec4(244, 69, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "16": {
      name: "Share",
      rect: new Vec4(242, 45, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "17": {
      name: "Start",
      rect: new Vec4(242, 29, 40, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "18": {
      name: "Pause",
      rect: new Vec4(287, 184, 13, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "19": {
      name: "Play",
      rect: new Vec4(287, 158, 13, 14),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "20": {
      name: "Big 0",
      rect: new Vec4(288, 146, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "21": {
      name: "Big 1",
      rect: new Vec4(291, 128, 5, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "22": {
      name: "Big 2",
      rect: new Vec4(289, 112, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "23": {
      name: "Big 3",
      rect: new Vec4(289, 96, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "24": {
      name: "Big 4",
      rect: new Vec4(287, 73, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "25": {
      name: "Big 5",
      rect: new Vec4(287, 61, 7, 10),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "26": {
      name: "Bird 0",
      rect: new Vec4(264, 180, 17, 12),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "27": {
      name: "Bird 1",
      rect: new Vec4(264, 154, 17, 12),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "28": {
      name: "Bird 2",
      rect: new Vec4(223, 120, 17, 12),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "29": {
      name: "Pipe Down",
      rect: new Vec4(302, 121, 26, 135),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "30": {
      name: "Pipe Up",
      rect: new Vec4(330, 135, 26, 121),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "31": {
      name: "Instructions",
      rect: new Vec4(152, 85, 59, 49),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "32": {
      name: "Medal Bronze",
      rect: new Vec4(302, 97, 22, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "33": {
      name: "Medal Silver",
      rect: new Vec4(266, 5, 22, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "34": {
      name: "Medal Gold",
      rect: new Vec4(242, 5, 22, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "35": {
      name: "Medal Platinum",
      rect: new Vec4(220, 90, 22, 22),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "36": {
      name: "Black",
      rect: new Vec4(302, 79, 16, 16),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "37": {
      name: "White",
      rect: new Vec4(302, 61, 16, 16),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "38": {
      name: "Gears",
      rect: new Vec4(358, 249, 95, 7),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "39": {
      name: "Sparkle 1",
      rect: new Vec4(295, 177, 5, 5),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "40": {
      name: "Sparkle 2",
      rect: new Vec4(261, 141, 5, 5),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "41": {
      name: "Sparkle 3",
      rect: new Vec4(268, 141, 5, 5),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    },
    "52": {
      name: "Sparkle 0",
      rect: new Vec4(275, 141, 5, 5),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0)
    }
  }
}

export const getAtlas = async (app) => {

  return new Promise((resolve, reject) => {

    if(!app) throw new Error('App is required');

    if(atlas) return resolve(atlas);
  
    new TextureAtlasHandler(app).load(ATLAS_URL, (err, image) => {

      if(err) reject(err);
      
      atlas = new TextureAtlas();

      const texture = new Texture(app.graphicsDevice, {
        magFilter: FILTER_NEAREST,
        minFilter: FILTER_NEAREST
      });
            
      texture.setSource(image);
      atlas.texture = texture;
      atlas.frames = atlasOpts.frames

      resolve(atlas);
  
    });

  })

  // var spriteAsset = new pc.Asset('sprite', 'sprite', { url: '' });
  // spriteAsset.resource = sprite;
  // spriteAsset.loaded = true;
  // app.assets.add(spriteAsset);

  // atlas.frames = atlasOpts.frames
  // Object.entries(atlasOpts.frames).forEach(([key, value]) => {
  //   atlas.setFrame(key, value);
  // })

  // return atlas;
};