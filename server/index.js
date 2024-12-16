import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';  // Add the .js extension
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());

// Routes
app.use('/products', productRoutes);
// Serve static files from 'uploads' directory



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
