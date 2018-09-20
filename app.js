const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const morgan = require('morgan')
const port = process.env.PORT || 3000
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session);

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(session({
    secret: 'bquyqueajhbddc',
    resave: true,
    saveUninitialized: true,
    store: new FileStore({path: '/tmp/session'})
  }))
app.use('/auth', auth)

app.get('/', (req, res, next) => {
    res.send('you hit me')
})

app.use((req, res, next) => {
    //vanilla log of original url
    console.log(req.originalUrl)
    res.status(404).send('NOT FOUND')
})

app.use((error, req, res, next) => {
    //last route, error is the first parameter, tells express that this is the error handler
    console.log(error)
    res.status(500).send(error.message)
})

app.listen(port, () => console.log(`listening on ${port}`))