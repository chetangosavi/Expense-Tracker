import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import indexRoutes from "./routes/indexRoutes.js";
import morgan from 'morgan';
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/api', indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
