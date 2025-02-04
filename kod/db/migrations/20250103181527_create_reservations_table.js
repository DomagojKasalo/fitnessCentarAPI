/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary();
    table
      .integer('member_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('session_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('sessions')
      .onDelete('CASCADE');
    table.unique(['member_id', 'session_id']);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('reservations');
};
