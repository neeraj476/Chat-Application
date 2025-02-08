import express from 'express';
import dotenv  from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config();


import {connectTODB} from './lib/db.js'
import userRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
const app = express();
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/api/users",userRoutes)
app.use("/api/message",messageRoutes)

const port = process.env.PORT  || 3000
app.listen(port, async()=>{
    await connectTODB();
    console.log(`server is runing on port${port} `)
})