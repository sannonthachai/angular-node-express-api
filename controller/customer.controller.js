const CustomerModel = require('../models/customer')

class CustomerService {

    create(data) {
        let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.zipcode, data.password)

        customer.save()

        return customer
    }

}

module.exports = CustomerService