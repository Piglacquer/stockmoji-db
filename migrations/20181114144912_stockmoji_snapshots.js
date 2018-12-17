
exports.up = (knex, Promise) => {
  return knex.schema.createTable('stockmoji_snapshots', (snapshot) => {
    snapshot.increments('id')
    snapshot.integer('user_id')
    snapshot.foreign('user_id').references('stockmoji_users.id')
    snapshot.text('stock_ticker')
    snapshot.decimal('sentiment')
    snapshot.decimal('magnitude')
    snapshot.decimal('current_price')
    snapshot.dateTime('date_time')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('stockmoji_snapshots')
}
