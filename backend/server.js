import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js'
import notesRoutes from './routes/notes.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from "path"
import { fileURLToPath } from "url";


dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

console.log("NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


app.listen(port, ()=>{
    console.log(`Server is running on  http://localhost:${port}`)
    connectDB()
    
})