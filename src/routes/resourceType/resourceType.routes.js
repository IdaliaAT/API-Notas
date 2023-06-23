import { Router } from "express";
import ResourceTypeController from "../../controllers/resourceType/ResourceType.controller.js";

const resourceTypeRoutes = Router()

resourceTypeRoutes.get('/:idUser', ResourceTypeController.getAllResourceType)
resourceTypeRoutes.get('/id/:id', ResourceTypeController.getResourceTypeById)
resourceTypeRoutes.post('/:idUser', ResourceTypeController.createResourceType)
resourceTypeRoutes.put('/:id', ResourceTypeController.updateResourceType)
resourceTypeRoutes.delete('/:id', ResourceTypeController.deleteResourceType)

export default resourceTypeRoutes