import { Router } from 'express';
import NotesController from '../../controllers/notes/Notes.controller.js';

const notesRoutes = Router();

notesRoutes.get('/', NotesController.getAllNotes);
notesRoutes.get('/:id', NotesController.getNoteById);
notesRoutes.post('/', NotesController.createNote);
notesRoutes.put('/:id', NotesController.updateNote);
notesRoutes.delete('/:id', NotesController.deleteNote);

export default notesRoutes;
