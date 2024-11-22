import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './util/db.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import messageRouter from './routes/message.route.js'
dotenv.config()
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))
const corsOption = {
    origin : 'http://localhost:5173',
    credential: true
}
app.use(cors(corsOption))

//api route
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/message', messageRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
})