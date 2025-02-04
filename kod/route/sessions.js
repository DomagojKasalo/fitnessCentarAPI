const Router = require('@koa/router');
const Joi = require('joi');
const validate = require('../db/middleware/validate');
const { jwtCheck } = require('../db/middleware/auth');
const { roleCheck } = require('../db/middleware/authorization');
const sessionsRepo = require('../repo/sessions');

const router = new Router();

router.get(
  '/sessions',
  jwtCheck,
  async (ctx) => {
    const sessions = await sessionsRepo.getAll();
    ctx.body = sessions;
  }
);

router.post(
  '/sessions',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  validate.body({
    name: Joi.string().required(),
    date_time: Joi.date().required(),
    capacity: Joi.number().integer().positive().required(),
    trainer_id: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const session = await sessionsRepo.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = session;
  }
);

router.get(
  '/sessions/:id',
  jwtCheck,
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    const session = await sessionsRepo.getById(ctx.params.id);
    if (!session) {
      //ctx.status = 404;
      throw new Error('Not found');
    }
    ctx.body = session;
  }
);

router.put(
  '/sessions/:id',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  validate.params({ id: Joi.number().integer().required() }),
  validate.body({
    name: Joi.string().optional(),
    date_time: Joi.date().optional(),
    capacity: Joi.number().integer().positive().optional(),
  }),
  async (ctx) => {
    const updatedSession = await sessionsRepo.update(ctx.params.id, ctx.request.body);
    if (!updatedSession) {
      //status = 404;
      throw new Error('Not found');
      
    }
    ctx.body = updatedSession;
  }
);

router.delete(
  '/sessions/:id',
  jwtCheck,
  roleCheck(['admin']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    const deletedCount = await sessionsRepo.deleteById(ctx.params.id);
    if (deletedCount === 0) {
      //ctx.status = 404;
      throw new Error('Not found');
      
    }
    ctx.status = 204;
  }
);

module.exports = router;
