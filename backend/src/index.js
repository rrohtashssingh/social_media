
import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDb from './db/connection.js';
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 5000;

// Database connection
connectDb();

//middlewares
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', postRoutes);

app.listen(port, () => {
    console.log("Server has started on port", port);
})