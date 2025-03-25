import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import crypto from "crypto"
import multer from 'multer'


import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/authentication.js'
import {pool} from './config/database.js'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname )
    }
  })
  
const upload = multer({ storage })


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use('/posts',postRoutes)
app.use('/users',userRoutes)
app.use('/authenication',authRoutes)

app.post ('/upload', upload.single('file'), function (req,res) {
    const file = req.file
    res.status(200).json(file.filename)
})

const SECRET_KEY = "$2b$10$XyZ12345SecretKey67890abc."; 
const RESET_TOKEN = "re90349054kgnkndfndfkln@()#()jioewdfk"
const NumSaltRounds = 10
// https://devdotcode.com/node-js-mysql-add-forgot-reset-password-to-login-authentication-system/

{/* 
app.post("/Signup", async(req,res) => {
    try{ 
        console.log('Received request body:', req.body);
        

        const {firstName,lastName,email,phoneNumber,username,userPassword} = req.body
    
    if (!firstName || !lastName || !email || !phoneNumber || !username || !userPassword) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(userPassword, salt);  

    const query = `INSERT INTO users (firstName, lastName, email, phoneNumber, username, password_hash, userPassword) VALUES (?, ?, ?, ?, ?, ?,?)`
    const [result] = await pool.query(query, [firstName, lastName, email, phoneNumber, username, password_hash, userPassword]);

    console.log('User added:', result);
    res.status(201).json({ message: 'User added successfully' });
    }catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})


// logs login attempts
const logLoginAttempt = async (username, success, ip, userAgent, userId = null) => {
    const query = `
        INSERT INTO login_attempts (user_id, username_attempt, success, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(query, [userId, username, success, ip, userAgent]);
};
// checks recently failed attempts before login
const checkFailedAttempts = async (username, ip) => {
    const query = `
        SELECT COUNT(*) AS failed_attempts 
        FROM login_attempts 
        WHERE username_attempt = ? AND ip_address = ? AND success = FALSE 
        AND attempt_time > NOW() - INTERVAL 15 MINUTE
    `;
    const [rows] = await pool.query(query, [username, ip]);
    return rows[0].failed_attempts;
};

app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    if (!username || !password){
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        // Fetch user from database
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            await logLoginAttempt(username, false, ip, userAgent);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        const failedAttempts = await checkFailedAttempts(username, ip);
        if (failedAttempts >= 5) {
            return res.status(429).json({ message: "Too many failed attempts. Try again later." });
        }

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

app.post('/ForgotPassword', async(req, res, )=>{
    try{
    const email = req.body.email;
    console.log(email);
     
    const origin = req.header('Origin'); // we are  getting the request origin from  the HOST header

    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
     
     
    if(!user){
        // here we always return ok response to prevent email enumeration
       return res.json({status: 'ok'});
    }
    // Get all the tokens that were previously set for this user and set used to 1. This will prevent old and expired tokens  from being used. 
    const used = 1
    const query1 = `UPDATE ResetPasswordToken SET used = ?  WHERE email = ?` 
    const [expireOldTokens] = await pool.query(query1, [email, used]);

    console.log('expired old tokens updated: ', expireOldTokens)
    // create reset token that expires after 1 hours
   const resetToken = crypto.randomBytes(40).toString('hex');
   const resetTokenExpires = new Date(Date.now() + 60*60*1000);
   const createdAt = new Date(Date.now());
    
    
   const expiredAt = resetTokenExpires;
   
   //insert the new token into resetPasswordToken table
   const query = `INSERT INTO ResetPasswordToken ( email, Token_value,created_at, expired_at, used) VALUES (?, ?,?, ?, ?)`
   const [insertResetToken] = await pool.query(query, [email,resetToken, createdAt, expiredAt, used])
   console.log('reset tokens inserted: ', insertResetToken)

   // send email
   await sendPasswordResetEmail(email,resetToken, origin);
   res.json({ message: 'Please check your email for a new password' });

    } catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error"});
    }
});
 

async function sendEmail({ to, subject, html, from}) {
   
   const transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
            user:"jaylagreen52@gmail.com",
            pass:"nzog iqdj nrgl fqfo"
             //user: process.env.USER, //generated ethereal user
             //pass: process.env.PASS // generated ethereal password
           }
   })
  await transporter.sendMail({ from, to, subject, html });

   console.log("email sent sucessfully");
   };

async function sendPasswordResetEmail(email, resetToken, origin) {
       let message;
        
       if (origin) {
           const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken}&email=${email}`;
           message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
                      <p><a href="${resetUrl}">${resetUrl}</a></p>`;
       } else {
           message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
                      <p><code>${resetToken}</code></p>`;
       }
    
       await sendEmail({
            from:"g.jayla@aol.com",
           //from: process.env.EMAIL_FROM,
           to: email,
           subject: ' Reset your Password',
           html: `<h4>Reset Password </h4>
                  ${message}`
       });
   }

//  Reset token validate
async function  validateResetToken  (req, res, next){

   const email = req.body.email;
   const resetToken = req.body.token;
    
   if (!resetToken || !email) {
       return res.sendStatus(400);
      }

   // then we need to verify if the token exist in the resetPasswordToken and not expired.
   const currentTime =  new Date(Date.now());
    
    const query3 = `SELECT * FROM ResetPasswordToken WHERE (email = ? AND Token_value = ? AND expired_at > ?)`
    const [findValidToken] = await pool.query(query3,[email,token,  currentTime])
    
    console.log('valid tokens found: ', findValidToken)

   if (!token) { 
     res.json ( 'Invalid token, please try again.');
   }

   next();
   };


app.post('/ResetPassword', validateResetToken, async(req, res)=>{
       try{
           
           const newPassword = req.body.password;
           const email = req.body.email;
           

           if  (!newPassword) {
             return res.sendStatus(400);
            }
        
            const query4 = `SELECT * FROM users WHERE email = ?`
            const [getUserByEmail] = await pool.query(query4, [email])
          
            const user = getUserByEmail[0];

        
          const salt = genSaltSync(10);
          const  password = hashSync(newPassword, salt);
            
          // await db.updateUserPassword(password, user.id);
        
          query5=`UPDATE users SET userPassword=? WHERE userID = ?`
          const [updateUserPassword] = await pool.query(query5,[password, user.id])
          res.json({ message: 'Password reset successful, you can now login with the new password' });

       } catch(e){
           console.log(e);
       }
      })
    
/*
// https://www.geeksforgeeks.org/forgot-reset-password-feature-with-react-and-node-js/
app.post('/ForgotPassword', async (req, res) => {
    console.log("*")
    const {email} = req.body

    if (!email){
        return res.status(400).json({ error: 'Enter your email!' });
    }

    try{
        const [rows] = await pool.query(`SELECT email, userID FROM users WHERE email =?`,[email])
        console.log('this works!')

        if (rows.length===0){
            return res.status(401).json({ message: "You are not registered" });
        } else{
            const token = crypto.randomBytes(20).toString("hex")
            const resetToken = crypto.createHash("sha256").update(token).digest('hex')

            const createdAt = new Date().toISOString()
            const expiresAt = new Date(Date.now() + 60 * 60 * 24 *1000).toISOString

            const query = `INSERT INTO reset_tokens(token, created_at, expires_at, userID) VALUES (?, ?, ?, ?)`

            await pool.query(query, [resetToken, createdAt, expiresAt,rows[0].id])

            const mailOption = {
                email: email,
                subject: "Forgot Password Link",
                message: mailTemplate(
                  "We have received a request to reset your password. Please reset your password using the link below.",
                  `http://localhost:8000/ResetPassword?id=${user[0].id}&token=${resetToken}`,
                  "Reset Password"
                ),
              };
              await sendEmail(mailOption);
              res.json({
                success: true,
                message: "A password reset link has been sent to your email.",})
        }
    } catch(error){
        console.log(error)
    }
})

app.post('/ResetPassword', async (req, res) => {
    try{
        const {token, password, userID} = req.body
        const query = `SELECT token, expires_at from reset_tokens WHERE userID = ? ORDER BY created_at DESC LIMIT 1`
        const [rows]=await pool.query(query, [userID])

        const currDateTime = new Date()
        const expiresAt = new Date(rows[0].expires_at)

        if (currDateTime > expiresAt){
            res.status(201).json({ message: 'reset password link has expired' });
        } else if(rows[0].token !== token){
            res.status(201).json({ message: 'reset password link is invalid' });
        } else{
            const query = `DELETE FROM reset_tokens WHERE userID = ? VALUES(?)`
            await pool.query(query,[userID])
            const salt = await bcrypt.genSalt(NumSaltRounds)
            const hashedPassword = await bcrypt.hash(password,salt)

            const updatePasswordQuery = 'UPDATE users SET password = ? WHERE userID = ? VALUES (?,?)'
            await pool.query(updatePasswordQuery,[hashedPassword,userID])
            res.status(201).json({ message: 'User added successfully' });
        }

    } catch(error){
        console.log(error)
    }
})

// https://www.youtube.com/watch?v=AClnCg_WCJk
//https://www.youtube.com/watch?v=A8k4A7TuhDY
app.post('/ForgotPassword', async (req, res) => {

    const { email } = req.body;

    if (!email){
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "user not found" });
        }
        const user=rows[0]
        const secret = RESET_TOKEN + user.password
        const resetToken = jwt.sign({id:user.id, email:user.email},secret,{expiresIn:'5m'})

        const resetLink=`http://localhost:3000/#/ForgotPassword?${user.id}/${resetToken}`
        console.log(resetLink)
        
        return{success:true,message:`reset password email sent.`,resetLink}

        
    } catch (error) {
        console.error("error in user login:",error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

const resetPasswordService = async (token,password) => {
    try{
        const decoded = jwt.verify(token, RESET_TOKEN)
        const hashedPassword = await bcrypt.hash(password,10)
        const values = [password,decoded.id]

        await pool.query('Update users SET password=? WHERE userID = ', values)

        return {success:true, message:"password resest successful"}

    } catch(error){
        console.error("error in reset password:",error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    
}

app.post('/ResetPassword', async (req, res) => {
    const { token,password,userID } = req.body;

    if (!token, !password){
        return res.status(400).json({ error: 'Password is required' });
    }

    try {

        const expiresAt = new Date(RESET_TOKEN.expiresAt)

        if (currDateTime > expiresAt){
            console.error("reset password link gas expired")
        } else if(resetToken !== token){
            console.error("reset password link is invalid")
        } else{

        }
        // Fetch user from database
        const response = await resetPasswordService(token,password)



        if (response.success) {
            return res.status(200).json(response);
        } else{
            return res.status(401).json(response);
        }

        
    } catch (error) {
        console.error("user in user login:",error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
*/}

//const PORT = process.env.PORT //backend routing port
//const PORT = process.env.PORT || 8800 


const PORT = 8800 
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}.`)
}) 