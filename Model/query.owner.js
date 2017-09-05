const own = require('./owner.js')
const mysql = require('mysql')
<<<<<<< HEAD
=======
var _ = require("lodash");
>>>>>>> 25e04dec81ef59f827518318982ba4965f51a98e

var con = mysql.createConnection({
    host: 'localhost',
    user: "otto",
    password: "langsung",
    database: "restaurant"
})

var owner_list_tablename = "owner_list";

module.exports = {

    getAllOwner: function(cb) {
        var sql = "select * from " + owner_list_tablename;
        con.query(sql, (err, result) => {
            if(err) throw err;
            /*
            var nameResult = new Array(result.length)
            for(i=0; i<result.length;i++) {
                nameResult[i] = result[i].FirstName;
            }
            */
            cb(null, result)
        })
    },

    getOwnerbyID: function(id, cb) {
        var sql = "select * from " + owner_list_tablename + " where PersonID=" + id
        con.query(sql, (err, result) => {
            if(err) throw err;
            owner = own.owner
            for(const key of Object.keys(result[0])) {
                //based on ECMA Script https://stackoverflow.com/questions/7306669/how-to-get-all-properties-values-of-a-javascript-object-without-knowing-the-key
                owner[key] = result[0][key]
            }
            cb(null, owner)
        })
    },

    getSchema: function(cb) {
        own_schema = own.owner;
    }

}