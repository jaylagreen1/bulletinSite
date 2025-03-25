import express from "express"
import {addPost} from '../controllers/post.js'

const app = express.Router()

app.get('/post', addPost)

export default app