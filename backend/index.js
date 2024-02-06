
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import mongoose from 'mongoose';
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

//The on method registers an event listener that will be called every time the specified event occurs.
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// The once method registers an event listener that will be called at most once. 
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//middlewares
app.use(express.json());
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log("Server has started on port", port);
})