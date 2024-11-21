import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './util/db.js'
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



const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
})