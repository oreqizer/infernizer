import * as Koa from 'koa';
import * as Router from 'koa-router';

import infernoApp from './infernoApp';


const app = new Koa();

const router = new Router();


router.get('/', infernoApp);

app.use(router.routes());

app.listen(3000);
