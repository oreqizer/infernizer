import InfernoServer from 'inferno-server';

import Root from '../client/modules/Root';
import Html from './markup/Html';


async function app(ctx, next) {
  const root = InfernoServer.renderToString(<Root />);

  ctx.body = InfernoServer.renderToStaticMarkup(<Html root={root} />);
  ctx.status = 200;
}

export default app;
