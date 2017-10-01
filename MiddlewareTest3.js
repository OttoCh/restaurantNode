//controller
var express = require('express'),
    app = express()
//var middleware = require('./MiddlewareTest2.js')

exports.mid = function(req,res,next) {
    console.log("get middleware 1")
    next()
}, (req,res) => {
    console.log("get middleware 2")   
}

exports.mid2 = function(req, res, next) {
    console.log("get middleware 3")
    next()
}

exports.getIndex = function(req,res) {
    res.send("Hello")
}

/*
module.exports = function(app) {
    app.get('/:id', middleware.idHandler, function(req,res) {
        console.log('get id')
    })
}
*/

//typical flow of data
//schema -> controller -> routes -> app.js