/* @flow */
import React from 'react';
import ReactServer from 'react-dom/server';

import Root from '../client/modules/Root';
import Html from './markup/Html';


async function app(ctx, next) {
  const root = ReactServer.renderToString(<Root />);

  ctx.body = ReactServer.renderToStaticMarkup(<Html root={root} />);
  ctx.status = 200;
}

export default app;
