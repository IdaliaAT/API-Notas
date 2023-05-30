import { Router } from "express";
import ResourceController from "../../controllers/resource/Resource.controller.js";

const resourceRoutes = Router()

resourceRoutes.get("/", ResourceController.getAllResources)
resourceRoutes.get("/:id", ResourceController.getResourceById)
resourceRoutes.post("/", ResourceController.createResource)
resourceRoutes.put("/:id", ResourceController.updateResource)
resourceRoutes.delete("/:id", ResourceController.deleteResource)

export default resourceRoutes