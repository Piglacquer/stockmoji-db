const db = require('../database-connection')

module.exports = {
  getStocksByUser (userId) {
    return db('stockmoji_snapshots').where('user_id', userId).orderBy('stock_ticker', 'asc').orderBy('date_time', 'desc').returning('*')
  },
  addStock (stock) {
    return db('stockmoji_snapshots').insert(stock)
  }
}
