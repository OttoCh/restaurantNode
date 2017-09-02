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

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())

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
        name: 'A'
    })
})

app.route('/create')
.get((req, res, next) => {
    res.render("create_restaurant", {})
})
.post((req,res,next) => {
    //insert ke database (urlencoded)
    console.log(req.url)
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

app.route('/list')
.get((req, res, next) => {
    var sql = "SELECT * FROM restaurant_list"
    con.query(sql, (err, result, fields) => {
        if(err) throw err;
        for(var i=0; i < result.length; i++) {
            var row = result[i]
            console.log(row.name)        
        }
        res.render('list_restaurant', {
            list: result
        })
    })
})

app.listen(portNumb, (err) => {
    if(err) {
        return console.log('something bad happned', err)
    }
    console.log('server is listening on ' + portNumb)
})