import React, { useContext, useState } from "react";
import Flower from '../images/images.jpeg'
import moment from "moment";
import {AuthContext} from "../context/authContext.js"
import { useLocation, useNavigate, useEffect } from "react-router-dom";
import Axios from 'axios';
import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";


function Single() {

    const [post, setPost] = useState({})

    const location = useLocation()
    const navigate = useNavigate()

    const postID = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext)

    useEffect(()=> {
        const fetchData = async()=>{
            try{
                const res = await Axios.get(`/posts/${postID}`)
                setPost(res.data)
            }catch(err){
                console.log(console.err);
            }
        }
        fetchData()
        }, [postID])

    const handleDelete = async()=>{
        try{
            await Axios.delete(`/posts/${postID}`)
            navigate('/')
        }catch(err){
            console.log(console.err);
        }
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    
    return(
        <div className="single">
            <div className="content">
                <img src = {`../upload/${post?.img}`} alt ='' />
            <div className="user">
                {post.userImg && <img src={post.userImg} alt=''/>}
            <div className="info">
                <span>{post.username}</span>
                <p> Posted {moment(post.date).fromNow()}</p>
        </div>

        
        {currentUser.username === post.username && (
            <div className="edit">
                <Link to = {`/write?edit=2`} state={post}>
                    <img src={Flower} alt="" /> 
                </Link>
            <img onClick={handleDelete} src={Flower} alt="" />
            </div>
        )}
        </div>
            <h1>{post.title}</h1>
            {getText(post.desc)}
        </div>
        <Menu cat={post.cat} />
        </div>
    )

}

export default Single;