const Router = require('@koa/router');
const Joi = require('joi');
const validate = require('../db/middleware/validate');
const { jwtCheck } = require('../db/middleware/auth');
const { roleCheck } = require('../db/middleware/authorization');
const usersRepo = require('../repo/users');
const bcrypt = require('bcrypt');

const router = new Router();

router.get(
  '/trainers',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  async (ctx) => {
    const trainers = await usersRepo.getAll({ role: 'trainer' });
    ctx.body = trainers;
  }
);

router.post(
  '/trainers',
  jwtCheck,
  roleCheck(['admin']),
  validate.body({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const trainer = await usersRepo.create({ name, email, password: hashedPassword, role: 'trainer' });
    ctx.status = 201;
    ctx.body = trainer;
  }
);

router.get(
  '/trainers/:id',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    const trainer = await usersRepo.getById(ctx.params.id);
    if (!trainer || trainer.role !== 'trainer') {
      throw new Error('Not found')
    }
    ctx.body = trainer;
  }
);

router.put(
  '/trainers/:id',
  jwtCheck,
  roleCheck(['admin']),
  validate.params({ id: Joi.number().integer().required() }),
  validate.body({ name: Joi.string().optional(), email: Joi.string().email().optional() }),
  async (ctx) => {
    const updatedTrainer = await usersRepo.update(ctx.params.id, ctx.request.body);
    ctx.body = updatedTrainer;
  }
);

router.delete(
  '/trainers/:id',
  jwtCheck,
  roleCheck(['admin']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    await usersRepo.deleteById(ctx.params.id);
    ctx.status = 204;
  }
);

module.exports = router;
