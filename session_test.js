var express = require('express');
var session = require('express-session')

var app = express();

app.use(session({
    secret: "Shh, its a secret!",
    cookie: {
        maxAge: 60000
    }
}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.cookie('test', 'yes')
      console.log(res.cookies.test)
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000);