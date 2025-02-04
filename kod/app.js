require('dotenv-safe').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const swaggerUi = require('swagger-ui-koa');
const swaggerDocs = require('./swagger');

const app = new Koa()

app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
      if (error.message === 'User with this email already exists') {
        ctx.status = 400; 
        ctx.body = { error: error.message }; 
      }else if(error.message ==='Not found'){
      ctx.status = 404; 
      ctx.body = { error: error.message };
      } else if(error.message ==='Invalid email or password'){
        ctx.status = 401; 
        ctx.body = { error: error.message };
      }else {
        ctx.status = 500; 
        ctx.body = { error: 'An unexpected error occurred' }; 
      }
    }
})

app.use(require('./route/index').routes())
app.use(require('./route/auth').routes())
app.use(require('./route/members').routes())
app.use(require('./route/trainers').routes())
app.use(require('./route/sessions').routes())
app.use(require('./route/reservations').routes())

app.use(serve('node_modules/swagger-ui-dist'));

app.use(swaggerUi.serve);
app.use(swaggerUi.setup(swaggerDocs));

module.exports = app
