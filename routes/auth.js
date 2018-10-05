const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../database-connection')

router.get('/', (req, res, next) => {
    if (req.session.userId){
        return res.json({"userId": req.session.userId, "loggedIn": true})
    }
    return res.json({"loggedIn": false}) 
})

router.post('/login', (req, res, next) => {
    return db('stockmoji_users').where({username: req.body.username})
        .then(([user]) => {
            if(!user){
                return res.status(404).json({"loggedIn": 'Username or password incorrect'})
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.userId = user.id
                return res.json(req.session)
            }
                return res.json({"loggedIn": 'Username or password incorrect'})
        })
        .catch(next)
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

router.get('/logout', (req, res, next) => {
    if (req.session.userId){
        return req.session.destroy((err) => {
            if(err){
                return res.status(500).send({'error': err})
            }
            return res.send({'message': 'successfully logged out'})
        })
    }
    return res.json({"status": "not logged in"})
})

module.exports = router