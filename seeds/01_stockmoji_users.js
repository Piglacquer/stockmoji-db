
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('stockmoji_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('stockmoji_users').insert([
        { username: 'test', password: 'password' }
      ])
    })
}
