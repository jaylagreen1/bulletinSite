const mysql = require("mysql2")

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'riley5712',
    database: 'bulletin'
})



module.exports = pool