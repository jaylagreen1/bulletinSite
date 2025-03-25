import express from "express"
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js"

const app = express.Router()

app.get('/', getPosts)
app.get('/:id', getPost)
app.post('/', addPost)
app.delete('/:id', deletePost)
app.put('/:id', updatePost)

export default app