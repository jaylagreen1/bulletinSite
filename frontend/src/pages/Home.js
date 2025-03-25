import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
//import image from '../images/kitten.jpeg'

function Home(){

    const [posts, setPosts] = useState([])

    const cat = useLocation().search

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await Axios.get(`/posts${cat}`)
                setPosts(res.data)
            }catch(err){
                console.log(console.err);
            }
            }
            fetchData()
        }, [cat])
    
    {/* 
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

    ] */}


    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    return(
        <div className="home">
            <div className='posts'>
                {posts.map((post)=>(
                    <div className="post" key={post.id}> 
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                </div>
                <div className="content">
                    <Link className="link" to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        </Link>
                    <p> {getText(post.desc)}</p>
                    <button>Read More!</button>
                    
            </div>
            </div>
        ))}

        </div>
        </div>
    )
}

export default Home;