import { Category } from '../../models/index.js';

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name', ]
            })
        } catch (err) {

        }


        res.status(200).send('These are all of your Categories');
    }
    static getCategoryById(req, res) {
        const { id } = req.params;
        res.status(200).send('This is your route of Category by id');
    }
    static async createCategory(req, res) {
        try {
            const { idUser } = req.params;
            const { name, description } = req.body;
            if (!name) throw { message: 'Name cannot be empty', codeStatus: 400 };

            const category = await Category.create({
                name,
                description,
                idUser,
            });
            if (!category)
                throw {
                    message: 'Something went wrong, your new Category is not created',
                    codeStatus: 500,
                };

            res.status(201).send({
                success: true,
                message: 'Your new Category has been created successfully',
            });
        } catch (err) {
            const codeStatus = err.codeStatus || 500;
            const message = err.message || 'Internal server error';
            res.status(codeStatus).send({ success: false, message });
        }
    }

    static updateCategory(req, res) {
        // Se trabaja con el id params en la operacion actualizar u update, para agregarlo en la condicion y asi no afecte todos los registros.	No olvidar del where.
        res.status(202).send('Your Category has been updated');
    }
    static deleteCategory(req, res) {
        // Se trabaja con el id params en la operacion delete para agregarlo en la condicion y asi no afecte todos los registros. No olvidar del where.
        res.status(202).send('Your Category has been deleted');
    }
}
export default CategoryController;