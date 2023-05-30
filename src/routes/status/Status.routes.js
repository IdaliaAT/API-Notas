import { Router } from 'express';
import StatusController from '../../controllers/status/Status.controller.js';

const statusRoutes = Router();

statusRoutes.get('/', StatusController.getAllStatus);
statusRoutes.get('/:id', StatusController.getStatusById);
statusRoutes.post('/', StatusController.createStatus);
statusRoutes.put('/:id', StatusController.updateStatus);
statusRoutes.delete('/:id', StatusController.deleteStatus);

export default statusRoutes;
