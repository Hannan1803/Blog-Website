import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "600mb", extended: true })); 
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Connection failed with error:", error);
        process.exit(1);
    }
};

connectDB();

app.use('/api' , blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server running on PORT  : ${PORT}`);
})
