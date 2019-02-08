const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const queries = require('../queries/auth')

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    return res.status(200).json({ 'userId': req.session.userId, 'loggedIn': true })
  }
  return res.status(404).json({ 'loggedIn': false })
})

router.post('/login', (req, res, next) => {
  return queries.loginUser(req.body.username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject(new Error('Username or password are incorrect'))
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.userId = user.id
        return res.json(req.session)
      }
      return Promise.reject(new Error('Username or password incorrect'))
    })
    .catch(next)
})

router.post('/register', (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, 12)
  const user = {
    email: req.body.email,
    username: req.body.username,
    password: hash
  }
  return queries.createUser(user)
    .then(response => response[0])
    .then(response => res.json(response))
})

router.get('/logout', (req, res, next) => {
  if (req.session.userId) {
    return req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ 'error': err })
      }
      return res.send({ 'message': 'successfully logged out' })
    })
  }
  return res.json({ 'status': 'not logged in' })
})

router.get('/loginCheck', (req, res, next) => {
  req.session.userId ? res.status(200).send({ loggedIn: true }) : res.status(404).send({ loggedIn: false })
})

module.exports = router
