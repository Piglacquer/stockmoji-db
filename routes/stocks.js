const express = require('express')
const router = express.Router()
const db = require('../database-connection')

router.post('/stocks', (request, response, next) => {
  response.send('hi')
})

module.exports = router
