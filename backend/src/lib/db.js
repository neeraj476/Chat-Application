import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const connectTODB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(con.connection.host);
    } catch (error) {
        console.log("Error while connecting db" , error);
    }
}