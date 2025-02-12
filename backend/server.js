const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./config/database');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())

app.post("/Page3", async(req,res) => {
    try{ 
        console.log('Received request body:', req.body);
        const {firstName,lastName,email,phoneNumber,username,userPassword,hostOrMember,hostID} = req.body
    
    if (!firstName || !lastName || !email || !phoneNumber || !username || !userPassword || !hostOrMember || !hostID) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    const query = `INSERT INTO users (firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    pool.query(query,[firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID], (err, result) => {
          if (err){
            console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
          }
          console.log('User added:', result);
      res.status(201).json({ message: 'User added successfully' });
    }

        )
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

const PORT = process.env.PORT || 8800 //backend routing port
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`)
})