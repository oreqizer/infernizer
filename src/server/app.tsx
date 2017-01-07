import { renderToStaticMarkup } from 'inferno-server';

import Html from './markup/Html';


async function app(ctx, next) {
  // TODO render Root as renderToString
  ctx.body = renderToStaticMarkup(<Html />);
  ctx.status = 200;
}

export default app;
