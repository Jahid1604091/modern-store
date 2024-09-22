import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const PORT =process.env.PORT || 5000;
const app = express();
connectDB();
app.get('',(req,res)=>{
    res.send('Server is up...')
});

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));