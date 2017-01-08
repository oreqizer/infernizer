import fs from 'fs';
import path from 'path';


type Assets = {
  bundle: { js: string, css: string },
  vendor: { js: string, css: string },
};


function loadAssets(): Assets {
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../assets.json'));

    return JSON.parse(String(raw));
  } catch (err) {
    // No assets.json - use defaults
    return {
      bundle: { js: 'bundle.js', css: 'bundle.css' },
      vendor: { js: 'vendor.js', css: 'vendor.css' },
    };
  }
}

export const assets = loadAssets();

export const production = process.env.NODE_ENV === 'production';

export const port = Number(process.env.PORT || 3000);
