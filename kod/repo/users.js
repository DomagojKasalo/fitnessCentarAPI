const db = require('../db');

async function create(data) {
  const existingUser = await db('users').where({ email: data.email }).first();

  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const [id] = await db('users').insert(data);
  return getById(id);
}
async function getAll(filter = {}) {
  return db('users').where(filter).select('*');
}
async function getById(id) {
  const user = await db('users').where({ id }).first();
  if (!user) {
    throw new Error('Not found');
  }
  return user;
}

async function getByEmail(email) {
  const user = await db('users').where({ email }).first();
  return user;
}

async function update(id, data) {
  const user = await getById(id);
  if (!user) {
    throw new Error('Not found');
  }
  await db('users').where({ id }).update(data);
  return getById(id);
}

async function deleteById(id) {
  const user = await getById(id);
  if (!user) {
    throw new Error('Not found');
  }
  return db('users').where({ id }).del();
}
module.exports = {
  create,
  getAll,
  getById,
  getByEmail, 
  update,
  deleteById,
};
