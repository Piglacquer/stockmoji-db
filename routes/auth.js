const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../database-connection')

router.post('/login', (req, res, next) => {
    return db('stockmoji_users').where({username: req.body.username})
        .then(([user]) => {
            if(!user){
                return res.status(404).send('no user found, bitch')
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.userId = user.id
                res.send(user)
            } else  {
                res.send('could not authenticate, bitch')
            }
        })
})

router.post('/signup', (req, res, next) => {
    var hash = bcrypt.hashSync(req.body.password, 12); 
    const user = {
        username: req.body.username,
        password: hash,
        email: req.body.email
    }
    return db('stockmoji_users').insert(user).returning('*')
        .then((response) => console.log(response))
})

module.exports = router