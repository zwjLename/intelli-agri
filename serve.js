const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const serve = require('koa-static');
const path = require('path')

const home   = serve(path.join(__dirname)+'/build/');
const hello = ctx => {
    ctx.response.body = 'Hello World';
  };
  app.use(home); 
  app.use(route.get('/', hello));
  app.listen(3000);