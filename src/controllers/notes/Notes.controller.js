import { Notes } from '../../models/index.js';
class NotesController {
    static async getAllNotes(req, res) {
        try {
            const notes = await Notes.findAll({
                attributes: ["id", "titleNote"],
            });
            if (!notes.length) throw { messages: "Notes not found", codeStatus: 404 }
            res.status(200).send({ success: true, message: "These are your Notes", results: notes })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async getNoteById(req, res) {
        try {
            const { id } = req.params
            const result = await Notes.findByPk(id, {
                attributes: { exclude: ['idTopic'] },
            })
            if (!result) throw { message: "Your Note was not found", codeStatus: 400 }
            res.status(200).send({ success: true, message: "These is your Note", result });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async createNote(req, res) {
        try {
            const { idTopic } = req.params
            const { titleNote, text, image } = req.body
            if (!titleNote || !text) throw { message: "Your fields cannot be empty", codeStatus: 400 }
            const noteCreate = await Notes.create({ titleNote, text, image, idTopic })
                //console.log("🚀 ~ file: Notes.controller.js:19 ~ NotesController ~ createNote ~ noteCreate:", noteCreate)
            if (!noteCreate) throw { message: "Your Note was not created", codeStatus: 500 }
            res.status(201).send({ success: true, message: "Your Note has been created" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async updateNote(req, res) {
        try {
            const { id } = req.params
            const { titleNote, text, image } = req.body
            const note = await Notes.update({ titleNote, text, image }, {
                where: { id }
            })
            if (!note[0]) throw { message: "Something went wrong, your Note is not updated", codeStatus: 400 }
            res.status(200).send({ success: true, message: "YOur Note updated" });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message: "Your Note was updated" })
        }
    }
    static async deleteNote(req, res) {
        try {
            const { id } = req.params
            const noteDeleted = await Notes.destroy({
                where: { id }
            })
            if (!noteDeleted) throw { message: "Your Note was not deleted", codeStatus: 400 }
            res.status(200).send({ success: true, message: "Your Note was deleted" });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
}

export default NotesController;