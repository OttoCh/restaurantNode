//the main script for server
http = require('http')
portNumb = 1775

const path = require('path')
const express = require('express')
const exhbs = require('express-handlebars')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')

//app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

//mysql
var con = mysql.createConnection({
    host: 'localhost',
    user: "otto",
    password: "langsung",
    database: "restaurant"
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
    //insert ke database (urlencoded)
    var restaurant_name_value = req.body.restaurant_name
    var owner_value = req.body.owner
    var sql = "INSERT INTO restaurant_list (name, owner) VALUES "
    sql += "('" + restaurant_name_value + "','" + owner_value + "');"
    if(restaurant_name_value != undefined && owner_value != undefined) {
        con.query(sql, (err, result) => {
            if(err) throw err;
            console.log("Number of record inserted: " + result.affectedRows);
        })
    }
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