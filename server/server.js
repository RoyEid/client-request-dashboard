import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
}));
app.use(express.json());

app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Client Request Dashboard API is running",
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
