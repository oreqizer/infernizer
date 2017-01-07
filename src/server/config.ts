import fs from 'fs';
import path from 'path';


type Assets = {
  bundle: { js: string, css: string },
  vendor: { js: string },
};

function loadAssets(): Assets {
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../assets.json'));

    return JSON.parse(String(raw));
  } catch (err) {
    console.error('[config] Error loading asset info', err);

    throw err;
  }
}

export const assets = loadAssets();

export const env = process.env.NODE_ENV || 'dev';

export const port = Number(process.env.PORT || 3000);
