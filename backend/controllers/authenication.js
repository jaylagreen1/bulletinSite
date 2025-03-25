

import {pool} from '../config/database.js'
import bcrypt from 'bcryptjs' 


export const register=( req,res) =>{
    //CHECK EXISTING USER
    const query1 = "SELECT * FROM users WHERE email = ? or username =/"

    db.query(query1,[req.body.email,req.body.name], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json('user already exists')
    
        //hash password & create user
        const salt = bcrypt.genSalt(10);
        const password_hash = bcrypt.hash(req.body.password, salt);  

        const query2 = `INSERT INTO users (firstName, lastName, email, phoneNumber, username, password_hash, userPassword) VALUES (?, ?, ?, ?, ?, ?,?)`
        pool.query(query2, [firstName, lastName, email, phoneNumber, username, password_hash, userPassword], (err,data) =>{
            if (err) return res.json(err)
            return res.status(200).json("user has been created.")
        });

        })
}
export const login=( req,res) =>{
    //CHECK USER

    const query = "SELECT * FROM users WHERE username = ?";

    pool.query(query, [req.body.username], (err,data)=>{
        if (err) return res.json(err);
    if (data.length === 0) return res.status(409).json('user not found!')

    //check password
        const isPasswordCorrect =  bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(400).json('wrong username or password')
        
        const token = jwt.sign({id: data[0].id}, 'jwtkey')
        const {password, ...other} = data[0]

        res
            .cookie('access_token', token,{
                httpOnly: true,
            })
            .status(200)
            .json(other)


    });
}
export const logout=( req,res) =>{
    res.clearCookie('access_token',{
        sameSite:'none',
        secure:true
    }).status(200).json('user has been logged out.')
}