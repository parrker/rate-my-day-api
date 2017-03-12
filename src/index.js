import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaRespond from 'koa-respond';

const app = new Koa();
const router = new KoaRouter();
const port = 3000;

// response
router.get('/', async ctx => {
  return ctx.ok({ message: 'Hello' });
});

app.use(KoaRespond());
app.use(KoaBodyParser());
app.use(router.routes());

app.listen(port);
console.log(`Listening on port ${port}`);