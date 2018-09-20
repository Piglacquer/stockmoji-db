
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stockmoji_users', (user) => {
      user.increments('id')
      user.string('username')
      user.string('password')
      user.string('email')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stockmoji_users')
};
