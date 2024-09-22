import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { errHandler, notFound } from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cors({
    credentials: true,
    origin: [process.env.DEV_DOMAIN,process.env.LIVE_DOMAIN],
    // origin: "*",
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type',],
  }));

app.get('', (req, res) => {
    res.send('Server is up...')
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));