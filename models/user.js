const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    local: {
        email: String,
        username: String,
        password: String
    }
})

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

module.exports = mongoose.model('UserModel', userSchema)