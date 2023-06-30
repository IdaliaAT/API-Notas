import { Resource, ResourceType } from "../../models/index.js"
class ResourceController {

    static async getAllResources(req, res) {
        try {
            const resources = await Resource.findAll({
                attributes: ["titleResource", "description", "url"],
            });
            //console.log("🚀 ~ file: Resource.controller.js:11 ~ ResourceController ~ getAllResources ~ resource:", resource)
            if (!resources.length) throw { message: "There are no Resources to display", codeStatus: 404 }
            res.status(200).send({ success: true, message: "Your resources are:", results: resources });
        } catch (err) {
            const codeStatus = err.codeStatus || 500;
            const message = err.message || "Internal Server Error";
            res.status(codeStatus).send({ success: false, message });
        }
    }
    static async getResourceById(req, res) {
        try {
            const { id } = req.params
            const result = await Resource.findByPk(id, {
                attributes: ['id', 'titleResource', 'description', 'url'],
                include: { model: ResourceType, attributes: ['resourceType', 'image'] }
            })
            if (!result) throw { message: 'Resource not found', codeStatus: 404 }
            res.status(200).send({ success: true, message: 'This is your Resource', result })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async createResource(req, res) {
        try {
            const { idTopic } = req.params
            const { titleResource, description, url, idResourceType } = req.body
            if (!titleResource || !description || !url || !idResourceType) throw { message: "Resource and image cannot be empty", codeStatus: 400 }

            const resource = await Resource.create({ titleResource, description, url, idResourceType, idTopic })
            if (!resource) throw { message: "Your new resource has not been created", codeStatus: 500 }
            res.status(201).send({ success: true, message: "Your new Resource has been created successfully" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async updateResource(req, res) {
        try {
            const { id } = req.params
            const { titleResource, description, url, idResourceType } = req.body
            if (!titleResource || !description || !url || !idResourceType) throw { message: "You must indicate what do you want to update", codeStatus: 400 }
            const resourceUpdate = await Resource.update({ titleResource, description, url, idResourceType }, {
                where: { id }
            })
            console.log("🚀 ~ file: Resource.controller.js:59 ~ ResourceController ~ updateResource ~ resourceUpdate:", resourceUpdate[0])
            if (!resourceUpdate[0]) throw { message: "Your Resource was not updated", codeStatus: 400 }
            res.status(202).send({ success: true, message: "Your Resource has been updated successfully" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async deleteResource(req, res) {
        try {
            const { id } = req.params
            const resourceDelete = await Resource.destroy({
                    where: { id }
                })
                //console.log("🚀 ~ file: Resource.controller.js:76 ~ ResourceController ~ deleteResource ~ resourceDelete:", resourceDelete)
            if (!resourceDelete) throw { message: "There is something wrong, your Resource was not deleted", codeStatus: 500 }
            res.status(200).send({ success: true, message: "Your Resource has been deleted" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
}

export default ResourceController