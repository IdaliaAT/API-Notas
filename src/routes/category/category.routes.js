import { Router } from 'express';
import CategoryController from '../../controllers/category/Category.controller.js';

const categoryRoutes = Router();
categoryRoutes.get('/', CategoryController.getAllCategories);
categoryRoutes.get('/:id', CategoryController.getCategoryById);
categoryRoutes.post('/:id', CategoryController.createCategory);
categoryRoutes.delete('/:id', CategoryController.deleteCategory);
categoryRoutes.put('/:id', CategoryController.updateCategory);

export default categoryRoutes;
