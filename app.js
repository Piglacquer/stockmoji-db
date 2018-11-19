const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const stocks = require('./routes/stocks')
const morgan = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const port = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    cookie: {expires: 360000},
    name: 'hello',
    secret: 'lkmadfdfsaklm',
    resave: true,
    saveUninitialized: true,
    store: new FileStore({path: '/tmp/session', maxAge: 100000})
}))
app.use('/auth', auth)
app.use('/stocks', stocks)

// app.get('/', (req, res, next) => {
//     res.json({"loggedIn": true})
// })

app.use((req, res, next) => {
    //vanilla log of original url
    console.log(req.originalUrl)
    res.json('NOT FOUND').sendStatus(404)
})

app.use((error, req, res, next) => {
    //last route, error is the first parameter, tells express that this is the error handler
    console.log(error)
    res.send(error.message).sendStatus(500)
})

app.listen(port, () => console.log(`listening on ${port}`))