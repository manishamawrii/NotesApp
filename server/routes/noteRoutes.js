import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getNotes)
  .post(protect, createNote);

router.route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;

// protect is a middleware.

// Middleware runs before the controller.

// protect checks:

// Is the user logged in?

// Is the JWT token valid?

// ❌ If token is missing or wrong → request is rejected
// ✅ If token is correct → request continues





































