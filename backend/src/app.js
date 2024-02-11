 
 import express from 'express';
 import cookieParser from 'cookie-parser';
 import cors from 'cors';
 
 const app = express();

 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }));
 //this middleware is to access the json file to have 
 app.use(express.json({limit:"16kb"}));
 // using this middleware we can access the data from the url 
 app.use(express.urlencoded({extended:true, limit:"16kb"}));
 //using this middleware we can have all the files or pdf in the public folder.
 app.use(express.static("public"));
 app.use(cookieParser());

 export {app};