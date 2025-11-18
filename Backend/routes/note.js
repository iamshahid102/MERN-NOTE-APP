import express from 'express';
import { getNotes, createNote, updateNote, deleteNote, deleteAllNotes } from '../controllers/note.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all notes
router.get('/', auth, getNotes);

// Create a new note
router.post('/', auth, createNote);

// Update a note
router.put('/:id', auth, updateNote);

// Delete a note
router.delete('/:id', auth, deleteNote);

// Delete all notes
router.delete('/', auth, deleteAllNotes)

export default router;