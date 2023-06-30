import { Sequelize } from 'sequelize';
import { Category, Notes, Resource, Status, Topic } from '../../models/index.js';

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll({
                    attributes: ['id', 'name', 'description']
                })
                //console.log("🚀 ~ file: Category.controller.js:9 ~ CategoryController ~ getAllCategories ~ categories:", categories.length)
            if (!categories.length) throw { message: "No categories to display", codeStatus: 404 }
            res.status(200).send({ success: true, message: "These are your Categories", results: categories })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            if (!id) throw { message: "Id does not exist", codeStatus: 400 }

            const categoryById = await Category.findByPk(id, {
                attributes: { exclude: ["idUser"] },
                include: {
                    model: Topic,
                    attributes: { exclude: ["idStatus"] },
                    through: { attributes: [] },
                    include: [
                        { model: Status },
                        {
                            model: Resource,
                            attributes: ["resourceId", "titleResource"],
                        },
                        {
                            model: Notes,
                            attributes: ["noteId", "titleNote"],
                        },
                    ],
                },
            });
            res.status(200).send({
                success: true,
                message: "This is your route of Category by id",
                results: categoryById
            });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
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
    static async updateCategory(req, res) {
            try {
                const { id } = req.params
                const { name, description } = req.body
                if (!name) throw { message: "Category field is empty", codeStatus: 400 }
                const category = await Category.update({ name, description }, {
                    where: {
                        id
                    }
                })
                if (!category[0]) throw { message: "Your category is not updated", codeStatus: 400 }
                res.status(202).send({ success: true, message: "Your category has been updated" })
            } catch (err) {
                const codeStatus = err.codeStatus || 500
                const message = err.message || "Internal Server Error"
                res.status(codeStatus).send({ success: false, message })
            }
        }
        // Se trabaja con el id params en la operacion actualizar u update, para agregarlo en la condicion y asi no afecte todos los registros.	No olvidar del where.
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params
            const category = await Category.destroy({
                where: { id }
            })
            console.log("🚀 ~ file: Category.controller.js:110 ~ CategoryController ~ deleteCategory ~ category:", category)
            if (!category) throw { message: "Your is not deleted", codeStatus: 404 }
            res.status(202).send({ success: true, message: "Your category has been deleted" })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message });
        }
        // Se trabaja con el id params en la operacion delete para agregarlo en la condicion y asi no afecte todos los registros del where.
    }
}
export default CategoryController;