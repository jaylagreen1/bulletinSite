/* https://www.npmjs.com/package/mysql#performing-queries */

const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

/* const routesHandler = require(/routes/handler); */
const pool = require('/Users/jaylagreen/bulletinSite/app/backEnd/config/database.js')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
/*app.use('/',routesHandler) */

/*
pool.getConnection( (err, conn) => {
    if (err) throw err;
    const qry = `INSERT INTO users (firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    conn.query(qry, ['w','w','w@aol.com','910-423-7764','w','w','Host','79'],(err,result) =>{
        conn.release()
        if (err) throw err
        console.log(result)
    } )
})
*/
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




/*
app.post("/page3",(req,res)=>{ 
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;
  const userPassword = req.body.userPassword;
  const hostOrMember = req.body.hostOrMember;
  const hostID = req.body.hostID;

  

  db.query("INSERT INTO users (firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
  [firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID], 
  (err, result) => {
    console.log(err)
    }
  })

})
*/

const PORT = process.env.PORT || 8800 //backend routing port
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`)
})

