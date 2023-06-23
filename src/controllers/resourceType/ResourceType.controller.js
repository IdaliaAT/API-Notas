import { ResourceType } from "../../models/index.js";

class ResourceTypeController {
    static async getAllResourceType(req, res) {
        try {
            const { idUser } = req.params
            const resourceType = await ResourceType.findAll({
                    attributes: ["id", "resourceType", "image"],
                    where: { idUser },
                })
                //console.log("🚀 ~ file: ResourceType.controller.js:11 ~ ResourceTypeController ~ getAllResourceType ~ resourceType:", resourceType.length)
            if (!resourceType.length) throw { message: "There are no ResourceTypes", codeStatus: 404 }
            res.status(200).send({ success: true, message: "These are all of your ResourcesType", results: resourceType })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async getResourceTypeById(req, res) {
        try {
            const { id } = req.params
            const resourceById = await ResourceType.findByPk(id, {
                    attributes: [id, "resourceType", "image"]
                })
                //console.log("🚀 ~ file: ResourceType.controller.js:24 ~ ResourceTypeController ~ getResourceTypeById ~ resourceById:", resourceById)
            if (!resourceById) throw { message: "ResourceType not found", codeStatus: 404 }
            res.status(200).send({ success: true, message: "This is your ResourceType", results: resourceById })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(200).send({ success: false, message })
        }
    }
    static async createResourceType(req, res) {
        try {
            const { idUser } = req.params
            const { resourceType, image } = req.body
            if (!resourceType) throw { message: "Your fields cannot be empty", codeStatus: 400 }
            const type = await ResourceType.create({
                idUser,
                resourceType,
                image,
            })
            if (!type) throw { message: "Something went wrong, your new ResourceType was not created", codeStatus: 500 }
            res.status(201).send({ success: true, message: "Your new ResourceType has been created successfully" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async updateResourceType(req, res) {
        try {
            const { id } = req.params
            const { resourceType, image } = req.body
            if (!resourceType) throw { message: "ResourceType cannot be empty", codeStatus: 400 }
            const typeResource = await ResourceType.update({ resourceType, image }, {
                where: { id }
            })
            if (!typeResource[0]) throw { message: "Something went wrong, your ResourceType is not updated", codeStatus: 400 }
            res.status(202).send({ success: true, message: "Your ResourceType has been updated" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async deleteResourceType(req, res) {
        try {
            const { id } = req.params
            const type = await ResourceType.destroy({
                where: {
                    id
                }
            })
            if (!type) throw { message: "There is something wrong, your ResourceType is not deleted" }
            res.status(202).send({ success: true, message: "Your ResourceType has been deleted" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
}
export default ResourceTypeController;