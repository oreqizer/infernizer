import Inferno from 'inferno';

import Root from './modules/Root';


const app = document.getElementById('inferno');

Inferno.render(<Root />, app);

// Hot reload
// ---

const hmr: any = module;
if (hmr.hot) {
  hmr.hot.accept();
}
