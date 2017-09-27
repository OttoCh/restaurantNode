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
    //req.checkBody(['name', 'Name is required'],['email', 'email is required']).notEmpty(); 
    req.checkBody('name', 'Name is required').notEmpty(); 
    req.checkBody('email', 'email is required').notEmpty(); 
    req.checkBody('email', 'email is required').isEmail(); 
    req.checkBody('username', 'username is required').notEmpty(); 
    req.checkBody('password', 'password is required').notEmpty(); 
    req.checkBody('password2', 'password does not match').equals(req.body.password)
    
    //pastikan agar field name tdk kosong
    
    //var error = req.getValidationResult();

    req.getValidationResult().then(function(result) {
        try {
            result.throw()
            res.render('register')
            console.log("no error")
        }
        catch (err) {
            console.log("there is an error")
        }
        /*
        console.log(result.throw())
        if(result.isEmpty) {
            //tidak ada error sama sekali
            console.log("no")
        }
        else {
            //ada error
            console.log("yes")
        }
        */
    })
    

})

module.exports = router