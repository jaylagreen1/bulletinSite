/*
const express = require('express')
const router = express.Router()
const pool = require('../config/database')

router.get('/page3', async(req,res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try{
            const qry = 'SELECT username FROM users'
            conn.query(qry, (err, result) => {
                conn.release()
                if (err) throw err
                res.send(JSON.stringify(result))
            })
        } catch (err){
            console.log(err)
            res.end()
        }
        
    })
})

router.post('/add3', async(req,res) => {
    const newUser = req.body.newUser
    //const u

    pool.getConnection( (err, conn) => {
        if (err) throw err
        const qry = "INSERT INTO users (firstName, lastName, email, phoneNumber, username, userPassword, hostOrMember, hostID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        conn.query(qry, ['b','b','b@aol.com','111-111-1111','ba','b','Host', 90],(err,reesult) => {
            conn.release()
            if (err) throw err
            console.log('user added')
        })
        //res.redirect('/')
        //res.end()
    })
})
    */
   