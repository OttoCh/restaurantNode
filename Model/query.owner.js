const own = require('./owner.js')
const mysql = require('mysql')
var _ = require("lodash");

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
            /*
            owner = own.owner
            owner.PersonID = result[0].PersonID
            owner.FirstName = result[0].FirstName
            owner.LastName = result[0].LastName
            owner.Age = result[0].Age
            owner.Address = result[0].Address
            owner.City = result[0].City
            */
            owner = own.owner
            //_.defaults(owner, result[0].data)
            //data = new Array[result[0].length]
            for(const key of Object.keys(result[0])) {
                //var val = result[0][key]
                owner[key] = result[0][key]
                //console.log(val)
            }
            //console.log(result[0].)
            //var res = _.pick(_.defaults(owner, result[0]), _.keys(owner))
            cb(null, owner)
        })
    },

    getSchema: function(cb) {
        own_schema = own.owner;
    }

}