const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const customer = require('./routes/customer')

const app = express()

// Connect Database ================================================================
const db = require('./config/key')
mongoose.connect(db.mongoURI,db.set)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/api/v1/customer', customer)

module.exports = app