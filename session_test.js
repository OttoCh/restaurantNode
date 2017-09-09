http = require('http')
portNumb = 1775

var path = require('path')
var express = require('express')
var session = require('express-session');
var exhbs = require('express-handlebars')
var bodyParser = require('body-parser')
var app = express();

app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')

app.use(session({secret: 'ssshhh'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

var sess;

app.get('/', (req, res) => {
    sess = req.session;
    if(sess.email) {
        console.log('find email')
        res.redirect('/admin')
    }
    else {
        console.log('no email')
        res.render('index')
    }
})

app.get('/admin',function(req,res){
  sess = req.session;
if(sess.email) {
res.write('<h1>Hello ' + sess.email + '</h1>');
res.end('<a href="/logout">Logout</a>');
} else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href="/login">Login</a>');
}
});

app.post('/login',function(req,res){
    console.log("posted")
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  res.end('done');
});


app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});
});

app.listen(portNumb, (err) => {
    if(err) {
        return console.log('something bad happned', err)
    }
    console.log('server is listening on ' + portNumb)
})