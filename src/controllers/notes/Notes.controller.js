import { Notes } from '../../models/index.js';
class NotesController {
    static async getAllNotes(req, res) {
        try {
            res.status(200).send({ success: true });
        } catch (err) {}
    }
    static async getNoteById(req, res) {
        try {
            res.status(200).send({ success: true });
        } catch (err) {}
    }
    static async createNote(req, res) {
        try {
            res.status(200).send({ success: true });
        } catch (err) {}
    }
    static async updateNote(req, res) {
        try {
            res.status(200).send({ success: true });
        } catch (err) {}
    }
    static async deleteNote(req, res) {
        try {
            res.status(200).send({ success: true });
        } catch (err) {}
    }
}

export default NotesController;