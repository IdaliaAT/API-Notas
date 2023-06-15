import { Router } from 'express';
import StatusController from '../../controllers/status/Status.controller.js';

const statusRoutes = Router();

statusRoutes.get('/:idUser', StatusController.getAllStatus);
statusRoutes.get('/id/:id', StatusController.getStatusById);
statusRoutes.post('/:idUser', StatusController.createStatus);
statusRoutes.put('/:id', StatusController.updateStatus);
statusRoutes.delete('/:id', StatusController.deleteStatus);

export default statusRoutes;