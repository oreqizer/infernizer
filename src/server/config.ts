import fs from 'fs';
import path from 'path';


export const production = process.env.NODE_ENV === 'production';

export const port = Number(process.env.PORT || 3000);


type Assets = {
  bundle: { js: string, css?: string },
  vendor: { js: string, css?: string },
};

function loadAssets(): Assets {
  if (production) {
    const raw = fs.readFileSync(path.join(__dirname, '../assets.json'));

    return JSON.parse(String(raw));
  }

  return {
    bundle: { js: 'bundle.js' },
    vendor: { js: 'vendor.js' },
  };
}

export const assets = loadAssets();
