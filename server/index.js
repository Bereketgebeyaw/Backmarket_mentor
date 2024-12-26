import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';  // Add the .js extension
import cartRoutes from './routes/cartRoutes.js'; 
import { addOrder, getOrders } from './controllers/orderController.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import CategoryRoutes from "./routes/CategoryRoutes.js";

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());

// Routes
app.use('/products', productRoutes);
// Serve static files from 'uploads' directory

app.use('/cart', cartRoutes);
app.use('/category', CategoryRoutes);

app.use('/api/users', userRoutes);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
