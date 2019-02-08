const db = require('../database-connection')

module.exports = {
  loginUser (user) {
    return db('stockmoji_users').where({ username: user })
  },
  createUser (user) {
    return db('stockmoji_users').insert(user).returning('*')
  }
}
