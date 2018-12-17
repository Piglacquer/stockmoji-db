const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const stocks = require('./routes/stocks')
const morgan = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const port = process.env.PORT || 3000
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  cookie: { expires: 360000 },
  name: 'hello',
  secret: 'lkmadfdfsaklm',
  resave: true,
  saveUninitialized: true,
  store: new FileStore({ path: '/tmp/session', maxAge: 100000 })
}))
app.use('/auth', auth)
app.use('/stocks', stocks)

app.use((req, res, next) => {
  console.warn({ 'file not found': req.originalUrl })
  res.json('NOT FOUND').sendStatus(404)
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(403).send({ 'message': error.message })
})

app.listen(port, () => console.log(`listening on ${port}`))
