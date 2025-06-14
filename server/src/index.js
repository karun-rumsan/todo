import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT || 5000;
const API_PREFIX = "/api";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use(`${API_PREFIX}/todos`, todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
