const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../database-connection')

router.post('/login', (req, res, next) => {
    console.log(req.body.password)
    return db('stockmoji_users').where({username: req.body.username})
        .then(([user]) => {
            if(!user){
                return res.sendStatus(404).json('no user found, bitch')
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.userId = user.id
                console.log(user.id)
                res.json(user.id)
            } else {
                res.json('could not authenticate, bitch')
            }
        })
})

router.post('/signup', (req, res, next) => {
    var hash = bcrypt.hashSync(req.body.password, 12); 
    const user = {
        username: req.body.username,
        password: hash
    }
    return db('stockmoji_users').insert(user).returning('*')
        .then((response) => res.json(response))
})

module.exports = router