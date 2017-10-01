//middleware

module.exports = function(req, res, next) {
    console.log("get middleware from middlewareTest4")
    next()
}