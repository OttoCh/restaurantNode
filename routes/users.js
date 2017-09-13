var express = require('express')
var router = express.Router()

//users root
router.get('/', (req, res) => {
    console.log('get root of users')
})

//register 
router.get('/register', function(req,res) {
    res.render('register')
})

//login
router.get('/login', function(req,res) {
    res.render('login')
})

router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2

    //validation
    req.checkBody('name', 'Name is required').notEmpty(); 
    //pastikan agar field name tdk kosong

    //var errors = req.validationErrors();
    
    req.getValidationResult().then(function(result) {
        console.log(result)
        if(!result.isEmpty()) {
            console.log("no")
        }
        else {
            console.log("yes")
        }
    })
    

})

module.exports = router