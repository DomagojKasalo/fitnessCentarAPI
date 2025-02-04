const Router = require('@koa/router');
const Joi = require('joi');
const validate = require('../db/middleware/validate');
const { jwtCheck } = require('../db/middleware/auth');
const { roleCheck } = require('../db/middleware/authorization');
const usersRepo = require('../repo/users');
const bcrypt = require('bcrypt');

const router = new Router();

router.get(
  '/members',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  async (ctx) => {
    const members = await usersRepo.getAll({ role: 'member' });
    ctx.body = members;
  }
);

router.post(
  '/members',
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
    const member = await usersRepo.create({ name, email, password: hashedPassword, role: 'member' });
    ctx.status = 201;
    ctx.body = member;
  }
);

router.get(
  '/members/:id',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    const member = await usersRepo.getById(ctx.params.id);
    if (!member || member.role !== 'member') {
      //ctx.status = 404;
      throw new Error('Not found');
    }
    ctx.body = member;
  }
);

router.put(
  '/members/:id',
  jwtCheck,
  roleCheck(['admin']),
  validate.params({ id: Joi.number().integer().required() }),
  validate.body({ name: Joi.string().optional(), email: Joi.string().email().optional() }),
  async (ctx) => {
    const updatedMember = await usersRepo.update(ctx.params.id, ctx.request.body);
    ctx.body = updatedMember;
  }
);

router.delete(
  '/members/:id',
  jwtCheck,
  roleCheck(['admin']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    await usersRepo.deleteById(ctx.params.id);
    ctx.status = 204;
  }
);

module.exports = router;
