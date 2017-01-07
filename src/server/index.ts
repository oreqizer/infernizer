import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as logger from 'koa-logger';

import app from './app';


const koa = new Koa();

const router = new Router();


router.get('/', app);


koa.use(logger());

koa.use(serve('../'));

koa.use(router.routes());

koa.listen(3000);
