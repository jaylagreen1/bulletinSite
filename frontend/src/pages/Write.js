import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


function Write() {

    const state = useLocation().state
    const [value, setValue] = useState(state?.title || '')
    const [title, setTitle] = useState(state?.desc || '')
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat ||'')

    const Navigate= useNavigate()

    const upload = async()=>{
        try{
            const formData = new FormData()
            formData.append('file',file) //helper in server.js app.post upload
            const res = await Axios.post('/upload',formData)
            return res.data
        } catch (err){
            console.log(err)
        }
    }
    const handleClick = async e =>{
        e.preventDefault ()
        const imgUrl = await upload()

        try{
            state ? await Axios.put(`/posts/${state.id}`, { 
            title,desc: value, cat, img:file ? imgUrl: ''
        }) : await Axios.put(`/posts/`, { 
            title,desc: value, cat, img:file ? imgUrl: '', date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        })
        Navigate('/')
        }catch(err){
            console.log(err)
        }

    }
    return(
        <div className="add">
            <div className="content">
                <input type='text' value = {title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:'none'}} type='file' id='file' name='' onChange={e=>setFile(e.target.files[0])} />
                    <label classname='file' htmlFor='file'> Upload Image </label>
                    <div className="'buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type='radio' checked = {cat=== "art"} name='cat' value='art' id="art"/> {/* 2:02:09 */}
                    <label htmlFor="art">Art</label>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Write;