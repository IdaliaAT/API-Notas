import { Resource } from "../../models/index.js"
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
            const result = await Resource.findByPk(id, { attributes: ['id', 'titleResource', 'description', 'url'] })

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
            const { titleResource, description, url, idResourceType } = req.body
            const { idTopic } = req.params
            if (!titleResource || !description || !url || !idResourceType) throw { message: "Resource and image cannot be empty", codeStatus: 400 }

            const resource = await Resource.create({ idTopic, titleResource, description, url, idResourceType })
            if (!resource) throw { message: "Your new resource has not been created", codeStatus: 500 }
            res.status(201).send({ success: true, message: "Your new Resource has been created successfully" })

        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: true, message })
        }
    }
    static updateResource(req, res) {
        res.status(202).send("Your Resource has been updated")
    }
    static deleteResource(req, res) {
        res.status(202).send("Your Resource has been deleted")
    }
}

export default ResourceController