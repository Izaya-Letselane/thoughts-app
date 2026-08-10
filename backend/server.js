import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js'
import notesRoutes from './routes/notes.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from "path"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const __dirname = path.resolve()
if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
}

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

app.listen(port, ()=>{
    console.log(`Server is running on  http://localhost:${port}`)
    connectDB()
    
})