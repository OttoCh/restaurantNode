var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var expressValidator = require('express-validator');
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local'),Strategy;
const mysql = require('mysql')


var routes = require('./routes/index');
var users = require('./routes/users');

//init app
var app = express()

//view engine
//app.set('views', path.join(__dirname, 'views'));  //keberadaan ini malah bikin error view engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')

//BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.shift('.'),
        root = namespace,
        formParam = root;

        while(namespace.length) {
            formParam == '[' + namespace.shift() + ']'
        }
        return {
            param : formParam,
            msg : msg,
            value : value   
        }
    }
}))

//Connect flash
app.use(flash());

//Global vars
app.use(function(req,res,next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'))
})
