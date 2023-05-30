import { Status } from '../../models/index.js';

class StatusController {
	static async getAllStatus(req, res) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {}
	}
	static async getStatusById(req, res) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {}
	}
	static async createStatus(req, res) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {}
	}
	static async updateStatus(req, res) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {}
	}
	static async deleteStatus(req, res) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {}
	}
}

export default StatusController;
