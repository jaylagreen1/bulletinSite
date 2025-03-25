import React, { useEffect, useState } from "react";
import Axios from 'axios';

function Menu ({cat}){

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await Axios.get(`/posts/?cat=${cat}`)
                setPosts(res.data)
            }catch(err){
                console.log(console.err);
            }
            }
            fetchData()
        }, [cat])

    /*
    const posts=[

        {id:1,
            title:"puppy",
            desc:"puppy",
            img:"https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
        },
        {id:2,
            title:"night",
            desc:"night",
            img:"https://static.stacker.com/s3fs-public/styles/sar_screen_maximum_large/s3/2024-07/big-dog-breeds_0.jpeg"
        },

    ] */

    return(
        <div className="menu">
            <h1> Other posts you may like</h1>
            {posts.map(post=>(
                <div className="post" key={post.id}>
                    <img src={`../upload/${post?.img}`} alt='' />
                    <h2>{post.title}</h2>
                    <button>Read More </button>
        </div>
    ))}
        </div>
    )
}

export default Menu