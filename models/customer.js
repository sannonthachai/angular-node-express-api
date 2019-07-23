const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    id: {
        type: Number
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    zipcode: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('CustomerModel', customerSchema)