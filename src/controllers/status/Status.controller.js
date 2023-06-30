import { Status } from '../../models/index.js';

class StatusController {

    static async getAllStatus(req, res) {
        try {
            const { idUser } = req.params
            const status = await Status.findAll({
                where: { idUser }
            });
            //console.log("🚀 ~ file: Status.controller.js:10 ~ StatusController ~ getAllStatus ~ status:", status.length)
            if (!status.length) throw { message: "There are no status", codeStatus: 404 }
            res.status(200).send({ success: true, message: "These are your status", results: status });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async getStatusById(req, res) {
        try {
            const { id } = req.params
            const status = await Status.findByPk(id, { attributes: ["id", "status"] })
                //console.log("🚀 ~ file: Status.controller.js:24 ~ StatusController ~ getStatusById ~ status :", status)
            if (!status) throw { message: "Status not found", codeStatus: 404 }
            res.status(200).send({ success: true, message: "This is your status", results: status });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async createStatus(req, res) {
        try {
            const { idUser } = req.params
            const { status } = req.body
            if (!status) throw { message: "Your status can not be empty", codeStatus: 400 }

            const createStatus = await Status.create({ idUser, status })
                // Este es el atributo de mi tabla Status.   Modelo = Tabla      Clave: Valor.  Y cuando la clave y el valor JavaScript nos brinda ese atajo, en los objetos.
                //console.log("🚀 ~ file: Status.controller.js:21 ~ StatusController ~ createStatus ~ status:", status)
            if (!createStatus) throw { message: "Your status has not been created", codeStatus: 500 }
            res.status(201).send({ success: true, message: "Your status has been created" });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async updateStatus(req, res) {
        try {
            const { id } = req.params
            const { newStatus } = req.body
            if (!newStatus) throw { message: "Status cannot be empty", codeStatus: 400 }
            const updateStatus = await Status.update({ status: newStatus }, { where: { id } })
                //console.log("🚀 ~ file: Status.controller.js:56 ~ StatusController ~ updateStatus ~ updateStatus:", updateStatus[0])
                // Para acceder a una posicion ponemos [0]        Este es solo el elemento en la posicion.
            if (!updateStatus[0]) throw { message: "Your Status was not updated", codeStatus: 400 }
            res.status(200).send({ success: true, message: "Your status has been updated" });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async deleteStatus(req, res) {
        try {
            const { id } = req.params
            const statusDelete = await Status.destroy({
                    where: {
                        id
                    }
                })
                //console.log("🚀 ~ file: Status.controller.js:75 ~ StatusController ~ deleteStatus ~ statusDelete:", statusDelete)
            if (!statusDelete) throw { message: "Something went wrong, your status is not deleted", codeStatus: 400 }
            res.status(200).send({ success: true, message: "Your status has been deleted" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
}

export default StatusController;