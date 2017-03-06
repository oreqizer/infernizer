import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';

import app from './app';
import { port } from './config';


const koa = new Koa();

const router = new Router();


router.get('/', app);

// TODO remove ' as any' when Koa is fixed
koa.use(logger() as any);

koa.use(serve(path.join(__dirname, '../static/')) as any);

koa.use(router.routes() as any);

koa.listen(port);
