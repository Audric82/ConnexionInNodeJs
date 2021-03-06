var express = require('express')
var userCtrl = require('./api/routes/userCtrl')

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/register/').post(userCtrl.register)
    apiRouter.route('/users/login/').post(userCtrl.login)

    return apiRouter
})()