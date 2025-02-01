const express = require('express');
const mysql = require('mysql2'); // npm install mysql2

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bulletin'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log(' Connected to MySQL database');
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App running at http://localhost:${port}`));
