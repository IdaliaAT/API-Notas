import { User } from '../../models/index.js';

class UserController {
	static async getAllUsers(req, res) {
		try {
			const users = await User.findAll({
				attributes: ['id', 'firstName', 'lastName'],
			});
			if (!users.length)
				throw { message: 'There are no users to display', codeStatus: 404 };
			res
				.status(200)
				.send({
					success: true,
					message: 'These are all your users',
					results: users,
				});
		} catch (err) {
			const codeStatus = err.codeStatus || 500;
			const message = err.message || 'Internal Server Error';
			res.status(codeStatus).send({ success: false, message });
		}
	}
	static getUserById(req, res) {
		const { id } = req.params;
		res.status(200).send('This is your route of User by id');
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

			res
				.status(201)
				.send({ success: true, message: 'Your new user has ben created' });
		} catch (err) {
			const codeStatus = err.codeStatus || 500;
			const message = err.message || 'Internal Server Error';
			res.status(codeStatus).send({ success: true, message });
		}
	}
	static updateUser(req, res) {
		res.status(202).send('Your User has been updated');
	}
	static deleteUser(req, res) {
		res.status(202).send('Your User has been deleted');
	}
}
export default UserController;
