import React from 'react';
import { render } from 'react-dom';

import Root from './modules/Root';


const app = document.getElementById('react');

if (app) {
  render(<Root />, app);
}

// Hot reload
// ---

const hmr: any = module;
if (hmr.hot) {
  hmr.hot.accept();
}
