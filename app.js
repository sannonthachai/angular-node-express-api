// For our express application =====================================================
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const app = express()
// For database ====================================================================
const mongoose = require('mongoose')

// Connect Database ================================================================
const db = require('./config/key')
mongoose.connect(db.mongoURI,db.set)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

// Set up our express application ==================================================
app.use(morgan('dev')) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressValidator())

// CORS ============================================================================
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Routes ==========================================================================
app.use('/api/v1/customer', require('./routes/customer.route'))

// Connect Port ====================================================================
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}` + '\n' + 'At part /api/v1/customer'))

module.exports = app