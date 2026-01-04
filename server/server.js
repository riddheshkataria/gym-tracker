import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();

connectDB();

const app=express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req,res)=>{
    res.json({
        message:"System online",
        status: "Success"
    });
});

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`);
});