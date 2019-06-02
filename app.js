const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const session = require('koa-session');

const renders = require('./tools/render');
const routers = require('./routers/index');
const auth = require('./services/auth');

const app = module.exports = new Koa();
app.keys = ['Its a key for koa'];

app.use(session({
  key: 'koa:sess', /** cookie的名称 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, app));

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "Protected resource, use Authorization header to get access\n",
        data: {}
      }
    } else {
      throw err;
    }
  })
});

// app.use(auth.filter);//权限拦截
app.use(logger());
app.use(bodyParser());

//静态资源配置
app.use(static(path.join(__dirname, './static')));

//模板渲染
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

//404拦截
app.use(async function (ctx, next) {
  await next();
  console.log(ctx.status);
  if (ctx.status === 404) {
    ctx.set('Content-Type', 'text/html;charset="utf-8"');
    const data = await renders('404.html');
    ctx.body = data;
  }
});

let port = 8080;
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
  console.log(`Sever start at 127.0.0.1:${port}`);
});