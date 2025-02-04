const Router = require('@koa/router');
const Joi = require('joi');
const validate = require('../db/middleware/validate');
const { jwtCheck } = require('../db/middleware/auth');
const { roleCheck } = require('../db/middleware/authorization');
const reservationsRepo = require('../repo/reservations');

const router = new Router();

router.get(
  '/reservations',
  jwtCheck,
  roleCheck(['admin', 'trainer']),
  async (ctx) => {
    const reservations = await reservationsRepo.getAll();
    ctx.body = reservations;
  }
);

router.post(
  '/reservations',
  jwtCheck,
  roleCheck(['member', 'trainer', 'admin']),
  validate.body({
    member_id: Joi.number().integer().required(),
    session_id: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const { member_id, session_id } = ctx.request.body;

    const existingReservation = await reservationsRepo.getByMemberAndSession(member_id, session_id);
    if (existingReservation) {
      ctx.status = 400;
      ctx.body = { error: 'Reservation already exists for this member and session' };
      return;
    }

    const reservation = await reservationsRepo.create({ member_id, session_id });
    ctx.status = 201;
    ctx.body = reservation;
  }
);

router.delete(
  '/reservations/:id',
  jwtCheck,
  roleCheck(['member', 'trainer', 'admin']),
  validate.params({ id: Joi.number().integer().required() }),
  async (ctx) => {
    const deletedCount = await reservationsRepo.deleteById(ctx.params.id);
    if (deletedCount === 0) {
      //ctx.status = 404;
      throw new Error('Not found');
    }
    ctx.status = 204;
  }
);

module.exports = router;
