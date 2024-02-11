
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDb = async ()=>{
    try{
       await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        const db = await mongoose.connection;
    }catch(error){
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

export default connectDb;