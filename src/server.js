import express from "express";
import dotenv from "dotenv";
import connectDB from "./connect/db.js";
const server = express();

dotenv.config();

const port = process.env.PORT;

server.use(express.json());

import developerRouter from './router/developer.router.js';

server.use('/api/v1/developer', developerRouter);

const start = async () => {
  await connectDB();
  console.log("DB Connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
