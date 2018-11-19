const express = require('express')
const router = express.Router()
const db = require('../database-connection')

router.post('/stocks', (request, response, next) => {
    console.log(request.body)
    response.send('hi')
})

module.exports = router