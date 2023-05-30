import { Resource } from "../../models/index.js"

class ResourceController {

    static getAllResources(req, res) {
        res.status(200).send("These are all of your resources")
    }
    static getResourceById(req, res) {
        const { id } = req.params
        res.status(200).send("This is your route of Resource by id")
    }
    static async createResource(req, res) {
        try {
            const { resourceType } = req.body
            if (!resourceType) throw { message: "ResourceType cannot be empty", codeStatus: 400 }

            const resource = await Resource.create({ resourceType })
            if (!resource) throw { message: "Your new resource has not been created", codeStatus: 500 }

            res.status(201).send({ success: true, message: "Your new Resource has been created successfully" })

        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: true, message })
        }




        res.status().send("You have created a new resource")
    }
    static updateResource(req, res) {
        res.status(202).send("Your Resource has been updated")
    }
    static deleteResource(req, res) {
        res.status(202).send("Your Resource has been deleted")
    }
}
export default ResourceController