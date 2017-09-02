//the main script for server
http = require('http')
portNumb = 1775

const path = require('path')
const express = require('express')
const exhbs = require('express-handlebars')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const restaurant_tablename = "restaurant_list"
const menu_tablename = "menu_list"

const app = express()

app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')

app.use(bodyParser.json())
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
    var sql = "INSERT INTO " + restaurant_tablename + " (name, owner) VALUES "
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

app.route('/brew/:id')
.get((req,res, next) => {
    //res.render("brew_menu", {})
    var restaurant_id = req.params.id
    var sql = "SELECT name from " + restaurant_tablename + " WHERE id=" + restaurant_id
    //console.log("brew " + restaurant_id)
    con.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log(result.name)
        res.render('brew', {
            restaurant_name: result[0].name
        })
    })
})
.post((req, res, next) => {
    var menu_name = req.body.menu_name
    var menu_price = req.body.menu_price
    var menu_description = req.body.menu_description
    var restaurant_id = req.params.id
    if(menu_name != undefined && menu_price != undefined) {
        var sql = "INSERT INTO " + menu_tablename + + " (menu_name, menu_price, description, restaurant_id) VALUES ";
        sql += "('" + menu_name + "'," + menu_price + ",'" + menu_description + "'," + restaurant_id + ");"
        con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('brew', {
                restaurant_name: "AA"
            })
        })
    }
})
//
app.route('/list')
.get((req, res, next) => {
    var sql = "SELECT * FROM " + restaurant_tablename
    con.query(sql, (err, result, fields) => {
        if(err) throw err;
        /*
        for(var i=0; i < result.length; i++) {
            var row = result[i]
            console.log(row.name)        
        }
        */
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