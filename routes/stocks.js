const express = require('express')
const router = express.Router()
const queries = require('../queries/stocks')

router.get('/:id', (req, res, next) => {
  return queries.getStocksByUser(req.params.id)
    .then(stocks => res.status(200).send(stocks))
})

router.post('/', (req, res, next) => {
  return queries.addStock(req.body)
    .then(newStock => res.status(200).send(newStock))
})

module.exports = router
