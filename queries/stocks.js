const db = require('../database-connection')

module.exports = {
  getStocksByUser (id) {
    return db('stockmoji_snapshots').where('id', id)
  },
  addStock (stock) {
    return db('stockmoji_snapshots').insert(stock)
  }
}
