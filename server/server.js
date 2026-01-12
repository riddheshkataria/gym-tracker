import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js';

dotenv.config();

connectDB();

const app=express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => res.send('API is reaching server.js'));
app.use('/api/users',userRoutes);
app.use('/api/exercises', exerciseRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.log("Error Code:", err.code); 
    console.log("Error KeyValue:", err.keyValue);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        statusCode = 400;
        // Check if it's the email or username that's duplicated
        const field = Object.keys(err.keyValue)[0];
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
    
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`);
});