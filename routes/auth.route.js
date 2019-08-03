// Set up router =========================================================================
const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const key = require('../config/key')
const { check, validationResult } = require('express-validator')
// Import model ==========================================================================
const User = require('../models/user')

router.get('/register', async (req,res) => {
    try {
        let users = await User.find()

        return res.json(users)
    }

    catch (err) {
        return err
    }
})

router.delete('/register/:id', async (req,res) => {

    try {
        let userDelete = await User.deleteOne({ _id: req.params.id })

        return res.json({ message: "User deleted!" })
    }
    
    catch (err) {
        return err
    }
})

router.post('/register', [
    check('email').isEmail(),
    check('username').isLength({ min: 8, max: 15 }),
    check('password').isLength({ min: 8, max: 15 })
], async (req,res) => {

    const { email, username, password } = req.body
    const errors = validationResult(req)

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Please enter all field" })
    }

    // if (password != password2) {
    //     return res.json({ message: "Passwords do not match" })
    // }

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        let user = await User.findOne({ 'local.username': username })

        if (user !== null) {
            return res.json({ message: "Username already exists" })
        }

        user = new User()

        user.local.email    = email
        user.local.username = username
        user.local.password = user.generateHash(password)

        user.save()

        return res.status(201).json({ message: "You are now registered and can login" })
    }

    catch (err) {
        return err
    }
})

router.post('/login', passport.authenticate('local', { session: false }), async (req,res) => {

    try {
        let payload = {
            sub: req.body.username,
            iat: new Date().getTime()
        }
        let token = await jwt.sign(payload, key.secret)
        
        return res.cookie('jwt', token, { httpOnly: true })
    }
    
    catch (err) {
        return err
    }
})

router.get('/logout', async (req,res) => {
    try {
        req.logout()

        return res.status(200).clearCookie('jwt', { httpOnly: true }).json({ message: "You are logged out" })
    }

    catch (err) {
        return err
    }
})

module.exports = router

