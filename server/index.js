import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';  // Add the .js extension
import cartRoutes from './routes/cartRoutes.js'; 
import { addOrder, getOrders } from './controllers/orderController.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import CategoryRoutes from "./routes/CategoryRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import loggedUserRouts from  './routes/loggedUserRouts.js'

import subcatgoryRouts from './routes/subcatgoryRouts.js' 
import sellerRoutes from "./routes/sellerRoutes.js";
import orderProductRoutes from "./routes/orderProductRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());  // Enable CORS

app.use(express.json({ limit: "10mb" }));


// Routes
app.use('/products', productRoutes);
// Serve static files from 'uploads' directory

app.use('/cart', cartRoutes);
app.use('/category', CategoryRoutes);
app.use('/orders', addressRoutes);
app.use("/orderProducts", orderProductRoutes);

app.use('/api/users', userRoutes);


app.use("/api/dashboard", loggedUserRouts);

app.use('/subcategory',subcatgoryRouts)

app.use("/api/sellers", sellerRoutes);

app.use("/catalog", catalogRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
