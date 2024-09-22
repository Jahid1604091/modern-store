import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.get('', (req, res) => {
    res.send('Server is up...')
});
app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));