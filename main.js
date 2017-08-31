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
    host: 'localhost'
    user: 
})

app.get('/', (req, res) => 


    res.render('home', {
        name: 'otto'
    })
})

app.listen(portNumb, (err) => {
    if(err) {
        return console.log('something bad happned', err)
    }
    console.log('server is listening on ' + portNumb)
})