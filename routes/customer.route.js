// Set up router =========================================================================
const express = require('express')
const router = express.Router()
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

router.post('/', async (req,res) => {
  
  try {
    let customer = new Customer(req.body)

    customer.save()
    
    return res.json({ message: 'Create complete!'})
  }

  catch (err) {
    return err
  }
})

router.get('/:customer_id', async (req,res) => {
  
  try {
    let customer = await Customer.findOne({ id: req.params.customer_id })

    if (customer === null) {
      return res.status(404).json({ message: "Can not found id"})
    } 
    else {
      return res.json(customer)
    }
  }

  catch (err) {
    return err
  }
})

module.exports = router
