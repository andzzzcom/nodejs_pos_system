const mysql		= require("mysql")
const conn		= mysql.createConnection({
					host:process.env.HOST,
					user:process.env.USER,
					database:process.env.DATABASE,
					password:process.env.PASSWORD,
					dateStrings: true
				})
conn.connect()

module.exports = conn