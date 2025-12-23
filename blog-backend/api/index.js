import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "../routes/blogRoutes.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors({
  origin: ["https://www.samirbogati.com.np", "http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Serve static files from the 'uploads' directory
// Note: In Vercel, this only serves files that were committed with the repo.
// New uploads will not persist.
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
    res.send("Blog Backend is Running");
});

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URI);
};

// Vercel serverless handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
