

import {app} from './app.js'
import dotenv from 'dotenv';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDb from './db/connection.js';
dotenv.config({ path: '.env.local' });

const port = process.env.PORT || 5000;

// Database connection
connectDb()
.then(()=>{
    console.log(`connected database on port ${process.env.PORT}`)
})
.catch((err)=>{
    console.log("Error occured while database connection...", err);
})

//middlewares
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', postRoutes);

app.listen(port, () => {
    console.log("Server has started");
})