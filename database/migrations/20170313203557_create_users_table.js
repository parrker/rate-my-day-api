
exports.up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('name');
    table.timestamps();
  })
);

exports.down = (knex) => (
  knex.schema.dropTable('users')
);
