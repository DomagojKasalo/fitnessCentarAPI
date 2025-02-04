const db = require('../db');

async function create(data) {
  const [id] = await db('sessions').insert(data);
  return getById(id);
}

async function getAll() {
  return db('sessions').select('*');
}

async function getById(id) {
  return db('sessions').where({ id }).first();
}

async function update(id, data) {
  await db('sessions').where({ id }).update(data);
  return getById(id);
}

async function deleteById(id) {
  return db('sessions').where({ id }).del();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
