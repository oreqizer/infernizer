import { Context } from 'koa';

async function app(ctx: Context, next: Function) {
  ctx.body = 'hello world';
  ctx.status = 200;
}

export default app;
