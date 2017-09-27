var express = require('express');
var routes2 = require('./MiddlewareTest2.js')

var app = express()

app.get('/:id', function(req, res, next) {
    if(req.params.id === '0') next('route')
    else next()
}, function(req,res,next) {
    res.send('first')
})

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'))
})
