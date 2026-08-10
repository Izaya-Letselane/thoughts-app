import express from "express";
import { addNotes, deleteNote, getAllNotes, getNote, updateNote } from "../controllers/notes.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.get("/getAllNotes",protectRoute, getAllNotes)
router.post("/add",protectRoute, addNotes)
router.delete("/delete/:id",protectRoute, deleteNote)
router.put("/update/:id",protectRoute, updateNote)
router.get("/getNote/:id", protectRoute, getNote)

export default router