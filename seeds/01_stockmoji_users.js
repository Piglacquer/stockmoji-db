exports.seed = (knex, Promise) => {
  return knex('stockmoji_users').del()
    .then(() => {
      return knex('stockmoji_users').insert([
        { username: 'nah', password: 'yeah', email: 'email' }
      ])
    })
}
