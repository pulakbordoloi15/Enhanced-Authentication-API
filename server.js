import express from "express";
import dotenv from 'dotenv';
import { connectUsingMongoose } from "./src/config/db.js";
import { ApplicationError } from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/userRoutes.js";
import profileRoutes from "./src/routes/profileRoutes";
import swagger from 'swagger-ui-express'
import passport from "./src/config/passport.js";
import apidocs from './swagger.json' with { type: "json" };

const server = express();
dotenv.config();

server.use(express.json());

server.use("/api-docs", swagger.serve, swagger.setup(apidocs))

//import './src/config/passport.js'

server.use(passport.initialize())

server.use('/api/auth',authRoutes )
server.use('/api/profiles', profileRoutes)

server.listen(3200, ()=>{
    console.log('Server is running at 3200');
  // connectToMongoDB();
  connectUsingMongoose();
  });
