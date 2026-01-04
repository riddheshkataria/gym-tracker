import mongoose from 'mongoose'
import dotenv from 'dotenv'


const connectDB= async()=>{
    try{
        const MONGO_URI=process.env.MONGO_URI
        const conn=await mongoose.connect(MONGO_URI);
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`!! ERROR !!: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
