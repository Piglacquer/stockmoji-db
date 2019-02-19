const db = require('../database-connection')

module.exports = {
  getStocksByUser (userId) {
    return db('stockmoji_snapshots').where('user_id', userId).returning('*')
  },
  addStock (stock) {
    return db('stockmoji_snapshots').insert(stock)
  }
}
