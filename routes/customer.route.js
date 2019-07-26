// Set up router =========================================================================
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
// Import model ==========================================================================
const Customer = require('../models/customer')

router.get('/', async (req, res) => {
  
  try {
    let customers = await Customer.find()

    return res.json(customers)
  }
  
  catch (err) {
    return err
  }
})

router.post('/', [
  check('first_name').isAlpha("en-US"),
  check('last_name').isAlpha("en-US"),
  check('email').isEmail(),
  check('zipcode').isLength({ min: 5, max: 5 }),
  check('password').isLength({ min: 8 })
], async (req,res) => {

  const { id, first_name, last_name, email, zipcode, password } = req.body
  const errors = validationResult(req)

  if (!id || !first_name || !last_name || !email || ! zipcode || !password) {
    return res.status(400).json({ message: "Please enter all field" })
  }

  if (!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() })
  }
  
  try {
    let customer = new Customer(req.body)

    customer.save()
    
    return res.status(201).json({ message: "Create complete!" })
  }

  catch (err) {
    return err
  }
})

router.route('/:customer_id') 

  .get(async (req,res) => {  

    try {
      let customer = await Customer.findOne({ id: req.params.customer_id })

      if (customer === null) {
        return res.status(404).json({ message: "Can not found customer" })
      } 
      else {
        return res.json(customer)
      }
    }

    catch (err) {
      return err
    }
  })

  .delete(async (req,res) => {

    try {
      let customer = await Customer.findOne({ id: req.params.customer_id })

      if (customer === null) {
        return res.status(404).json({ message: "Not have Customer" })
      }
      else {
        let customerDelete = await Customer.deleteOne({ id: req.params.customer_id })
        return res.json({ message: "Customer deleted!" })
      }
    }

    catch (err) {
      return err
    }
  })

module.exports = router
