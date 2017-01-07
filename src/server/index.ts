import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as logger from 'koa-logger';

import infernoApp from './infernoApp';


const app = new Koa();

const router = new Router();


router.get('/', infernoApp);


app.use(logger());

app.use(serve('../'));

app.use(router.routes());

app.listen(3000);
