const db			= require("./db")
db.query('SELECT * FROM settings WHERE status = 1', function(err, rows, fileds){
    if(err) throw err
    module.exports.GENERAL = Object.values(JSON.parse(JSON.stringify(rows)));
})
