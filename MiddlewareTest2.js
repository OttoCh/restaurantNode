//middleware
var app = require('express')

module.exports = {
    idHandler: function(req,res,next) {
        if(req.params.id==='0') {
            next('routes')
        }
        else next()
    }, function(req,res,next) {
            res.send('first')
    },

    idHandler2: function(req,res,next) {
        if(req.params.id==='0') {
            res.send('second')
        }
    }
}
