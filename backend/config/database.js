const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bulletin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})



module.exports = pool