//routes
var app = require('express')
var middleware = require('./MiddlewareTest2.js')

module.exports = function(app) {
    app.get('/:id', middleware.idHandler, middleware.idHandler2, function(req,res) {
        console.log('get id')
    })
}