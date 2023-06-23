import { Router } from 'express';
import userRoutes from './user/user.routes.js';
import categoryRoutes from './category/Category.routes.js';
import topicRoutes from './topic/topic.routes.js';
import resourceRoutes from './resource/resource.routes.js';
import notesRoutes from './notes/notes.routes.js';
import statusRoutes from './status/Status.routes.js';
import resourceTypeRoutes from './resourceType/resourceType.routes.js';

const routes = Router(); // aqui asignamos todos los metodos de Router

// A continuacion van a estar viviendo todos los verbos de course, student, subject y teacher, separados.
routes.use('/user', userRoutes);
routes.use('/category', categoryRoutes);
routes.use('/topic', topicRoutes);
routes.use('/resource', resourceRoutes);
routes.use('/notes', notesRoutes); //coregir
routes.use('/status', statusRoutes); //coregir
routes.use('/resourceType', resourceTypeRoutes)

export default routes;