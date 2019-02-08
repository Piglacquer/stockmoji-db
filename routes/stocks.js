const express = require('express')
const router = express.Router()
const db = require('../database-connection')

router.post('/:id', (req, res, next) => {
  res.status(200).json({ 'message': 'hi' })
})

module.exports = router
