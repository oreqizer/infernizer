import { Context } from 'koa';

async function infernoApp(ctx: Context, next: Function) {
  ctx.body = 'hello world';
  ctx.status = 200;
}

export default infernoApp;
