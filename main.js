//the main script for server
portNumb = 1775

const path = require('path')
const express = require('express')
const exhbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')

//mysql
var con = mysql.createConnection({
    host: 'localhost',
    user: "otto",
    password: "langsung"
})

con.connect(function(err) {
    if(err) throw err;
    console.log("connected");
})

app.get('/', (req, res) => {
    res.render('home', {
        name: 'otto'
    })
})

app.get('/create', (req, res) => {
    res.render("create_restaurant", {})
})

app.post('/create', (req,res) => {
    //insert ke database (json)

    
    res.render("create_restaurant", {
        post: "1"
    })
})

app.listen(portNumb, (err) => {
    if(err) {
        return console.log('something bad happned', err)
    }
    console.log('server is listening on ' + portNumb)
})