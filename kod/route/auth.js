const Router = require('@koa/router');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../db/middleware/validate');
const usersRepo = require('../repo/users');

const router = new Router();

router.post(
  '/register',
  validate.body({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'trainer', 'member').required(),
  }),
  async (ctx) => {
    const { name, email, password, role } = ctx.request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersRepo.create({ name, email, password: hashedPassword, role });
    ctx.status = 201;
    ctx.body = user;
  }
);

router.post(
  '/login',
  validate.body({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await usersRepo.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    ctx.body = { token };
  }
);


module.exports = router;
