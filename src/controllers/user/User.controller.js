import { User } from '../../models/index.js';
class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'userName', 'firstName', 'lastName'],
            });
            if (!users.length)
                throw { message: 'There are no users to display', codeStatus: 404 };
            res
                .status(200)
                .send({
                    success: true,
                    message: 'Your users are:',
                    results: users,
                });
        } catch (err) {
            const codeStatus = err.codeStatus || 500;
            const message = err.message || 'Internal Server Error';
            res.status(codeStatus).send({ success: false, message });
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const results = await User.findByPk(id, { attributes: ['id', 'userName', 'firstName', 'lastName', 'email'] })
            if (!results) throw { message: 'User not found', codeStatus: 404 }
            res.status(200).send({ success: true, message: "This is your user", results })
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async createUser(req, res) {
        try {
            const { userName, firstName, lastName, email, password } = req.body;
            if (!userName || !firstName || !lastName || !email || !password)
                throw { message: 'You must fill every field', codeStatus: 400 };
            const user = await User.create({
                userName,
                firstName,
                lastName,
                email,
                password,
            });
            if (!user)
                throw {
                    message: 'Your new user has not been created',
                    codeStatus: 500,
                };
            res.status(201).send({ success: true, message: 'Your new user has been created successfully' });
        } catch (err) {
            const codeStatus = err.codeStatus || 500;
            const message = err.message || 'Internal Server Error';
            res.status(codeStatus).send({ success: true, message });
        }
    }
    static async updateUser(req, res) {
        try {
            const { id } = req.params
            const { userName, firstName, lastName, email } = req.body
            if (!userName || !firstName || !lastName || !email) throw { message: "You must fill every field", codeStatus: 400 }
            const user = await User.update({ userName, firstName, lastName, email }, {
                    where: {
                        id
                    }
                })
                //console.log("🚀 ~ file: User.controller.js:73 ~ UserController ~ updateUser ~ user:", user[0])
            if (!user[0]) throw { message: "Your user is not updated", codeStatus: 400 }
            res.status(202).send({ success: true, message: "Your user has been updated" })

        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.destroy({
                    where: {
                        id
                    }
                })
                // console.log("🚀 ~ file: User.controller.js:91 ~ UserController ~ deleteUser ~ user:", user)
            if (!user) throw { message: "There is nothing to delete", codeStatus: 500 }
            res.status(202).send({ success: true, message: 'Your User has been deleted' });
        } catch (err) {
            const codeStatus = err.codeStatus || 500
            const message = err.message || "Internal Server Error"
            res.status(codeStatus).send({ success: false, message })
        }
    }
}
export default UserController;