const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config/database');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())

const SECRET_KEY = "your_secret_key"; 

app.post("/Signup", async(req,res) => {
    try{ 
        console.log('Received request body:', req.body);
        

        const {firstName,lastName,email,phoneNumber,username,userPassword} = req.body
    
    if (!firstName || !lastName || !email || !phoneNumber || !username || !userPassword) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(userPassword, salt);  

    const query = `INSERT INTO users (firstName, lastName, email, phoneNumber, username, password_hash) VALUES (?, ?, ?, ?, ?, ?)`
    const [result] = await pool.query(query, [firstName, lastName, email, phoneNumber, username, password_hash]);

    console.log('User added:', result);
    res.status(201).json({ message: 'User added successfully' });
    }catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        // Fetch user from database
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            await logLoginAttempt(username, false, ip, userAgent);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        // Compare password hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            await logLoginAttempt(username, false, ip, userAgent, user.id);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Log successful login
        await logLoginAttempt(username, true, ip, userAgent, user.id);

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get("/Search", async (req, res) => {
    const {query} = req.body;

    try {
        if (!query) return res.status(400).json({ error: "Search query required"});

        const [users] = await pool.query("SELECT userID, username FROM users WHERE username = ?", [query]);
        const [groups] = await pool.query("SELECT groupID, groupName FROM groups WHERE groupName = ?", [query]);

        console.log("Search results:", {users, groups });

        res.json({ users, groups});
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal server error"});
    }
});

/*app.post("/MyProfile", async(req,res) => {
    try{
        const {username,bio} = req.body

        if (!username || !bio) {
            return res.status(400).json({ error: 'All fields are required'});
        }
        

    }
    catch (error){
        console.error('Server error:', error);
    }
})*/

const PORT = process.env.PORT || 8800 //backend routing port
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`)
}) 