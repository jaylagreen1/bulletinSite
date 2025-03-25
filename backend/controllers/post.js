import {pool} from '../config/database.js'
import jwt from 'jsonwebtoken' 

export const getPosts = (req,res)=>{
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    pool.query(query,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).send(err)
        return res.status(200).json(data)
    })

}
export const getPost = (req,res)=>{
    const query1 = 'SELECT p.id, username, title, desc, p.img AS userImg, cat, date FROM users u JOIN posts p ON u.userID===p.userID WHERE p.id = ?'

    pool.query(query1,[req.params.id],(err,data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}
export const addPost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,'jwtkey',(err, userInfo)=>{
        if(err) return res.status(403).json("token is not valid")
        
        const q = ' INSERT INTO posts(title, desc, img, cat, date, uid) VALUE (?)'

        const values = [req.body.title, req.body.desc,req.body.img, req.body.cat, req.body.date, userInfo.id]

        pool.query(q, [values], (err, data)=>{
            if (err) return res.status(500).json(err)
            return res.json('post has been created')
        })
    })
}


export const deletePost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,'jwtkey',(err, userInfo=>{
        if(err) return res.status(403).json("token is not valid")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        pool.query(q, [postId, userInfo.id], (err, data)=>{
            if(err) return res.status(403).json('you can delete only your post!')

            return res.json("post has been deleted!  ")
            })
    }))

}
export const updatePost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token,'jwtkey',(err, userInfo)=>{
        if(err) return res.status(403).json("token is not valid")
        
        const postID = req.params.id
        const q = 'UPDATE posts SET title=? desc=?, img=?, cat=?) WHERE id = ? AND uid=? VALUE (?,?,?,?)'

        const values = [req.body.title, req.body.desc,req.body.img, req.body.cat]

        pool.query(q, [...values, postID, userInfo.id], (err, data)=>{
            if (err) return res.status(500).json(err)
            return res.json('post has been updated')
        })
    })
}
