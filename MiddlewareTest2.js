//route
var express = require('express'),
    router = express.Router(),
    app = express()
    controller = require('./MiddlewareTest3.js')

router.get('/', controller.mid, controller.getIndex)

/*
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
*/

module.exports = router