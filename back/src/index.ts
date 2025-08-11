import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

import authRouter from "./routers/auth.route.ts"
app.use(authRouter)

import profileRouter from "./routers/profile.route.ts"
app.use(profileRouter)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sevidor en el puerto:${PORT}`);
});
