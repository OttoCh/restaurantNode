var express = require('express');
var middleware = require('./MiddlewareTest3.js')

var app = express()

app.use(middleware.idHandler)

/*
app.get('/:id', function(req, res, next) {
    res.send('fourth')
    if(req.params.id === '0') next()
}, function(req,res,next) {
    console.log("here")
   // console.log(routes2.age)
   routes2.function1((res) => {
        console.log(res)
   })   
    //res.send('third')
})
*/

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'))
})

