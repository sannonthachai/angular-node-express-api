// For Local =============================================================================
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
// For JWT ===============================================================================
const JwtStrategy = require("passport-jwt").Strategy
const cookieExtractor = (req => {
    let token = null
    if (req && req.cookies) token = req.cookies['jwt']
    return token
})
const key = require('../config/key')
// Import model ==========================================================================
const User = require('../models/user')

module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
        usernameField: 'username',
        passwordField: 'password' 
      }, async (username, password) => {

          try {
              let user = await User.findOne({ 'local.username': username })

              if (user === null) {
                  return res.status(404).json({ message: "That username is not registered" })
              }

              let isMatch = await bcrypt.compare(password, user.local.password)

              if (isMatch === true) {
                  return res.status(200).json(user)
              } 
              else {
                  return res.status(422).json({ message: "Password incorrect" })
              }
          }

          catch (err) {
              return err
          }
      })
    )

    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: key.secret
    }, async (payload) => {

        try {
            let user = await User.findOne({ 'local.username': payload.sub })

            return res.json(user)
        }

        catch (err) {
            return err
        }
    }
    ))
}