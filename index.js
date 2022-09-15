const express = require('express')
const app = express()
const morgan = require('morgan')

const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
    app.use(function(req, res, next) {
        console.log('Logging');
        next()
    })
}

app.use('/users', (req, res, next) => {
    console.log('Users');
    next()
}, usersRouter)

app.use('/', (req, res, next) => {
    console.log('Home');
    next()
}, homeRouter)

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is working on port ', port);
})