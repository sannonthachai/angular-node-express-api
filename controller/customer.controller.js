const CustomerModel = require('../models/customer')

class CustomerService {

    static create(data) {
        let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.zipcode, data.password)

        customer.save()

        return customer
    }

    static read() {
        let customers = CustomerModel.find()

        return customers
    }

}

module.exports = CustomerService