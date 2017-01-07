import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';

import app from './app';


const koa = new Koa();

const router = new Router();


router.get('/', app);


koa.use(logger());

koa.use(serve(path.join(__dirname, '../static/')));

koa.use(router.routes());

koa.listen(3000);
