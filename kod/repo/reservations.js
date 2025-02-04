const db = require('../db');

async function create(data) {
  const [id] = await db('reservations').insert(data);
  return getById(id);
}

async function getAll() {
  return db('reservations')
    .select('reservations.*', 'users.name as member_name', 'sessions.name as session_name')
    .leftJoin('users', 'reservations.member_id', 'users.id')
    .leftJoin('sessions', 'reservations.session_id', 'sessions.id');
}

async function getById(id) {
  return db('reservations')
    .where({ 'reservations.id': id })
    .leftJoin('users', 'reservations.member_id', 'users.id')
    .leftJoin('sessions', 'reservations.session_id', 'sessions.id')
    .first();
}

async function deleteById(id) {
  return db('reservations').where({ id }).del();
}

async function getByMemberAndSession(member_id, session_id) {
  return db('reservations')
    .where({ member_id, session_id })
    .first();
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  getByMemberAndSession,
};
