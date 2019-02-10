
exports.seed = (knex, Promise) => {
  return knex('stockmoji_snapshots').del()
    .then(() => {
      return knex('stockmoji_snapshots').insert([
        { user_id: 1, stock_ticker: 'AAPL', sentiment: 0, magnitude: 20, current_price: 100.00, date_time: '2017-01-30T16:49:19.278Z' }
      ])
    })
}
