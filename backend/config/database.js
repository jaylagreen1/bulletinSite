import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: process.env.CONNECTION_LIMIT,
    queueLimit: 0
})


// let db

//module.exports = pool