var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var user = require('../objects/users')

module.exports = {
    register: function(request, response) {

        var username = request.body.username
        var firstname = request.body.userfirstname
        var password = request.body.password
        var email = request.body.email
        var phone = request.body.phone

        if (username == null || firstname == null || password == null
            || email == null || phone == null) {
                return response.status(400).json({ 'error': 'missing parameters'});
            }

        //TODO: verify if user (email) exists

    },

    login: function(request, response) {

    }
}