import { generateToken, verifyToken } from "../utils.js";

export default class RecoveryService {
	constructor(dao) {
		this.dao = dao;
	}

	async readToken(token) {
		try {
			const found = await this.dao.read(token);
			if (!found || !verifyToken(found.token, found.key)) {
				return null;
			} else return found;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async deleteToken(id) {
		try {
			const user = await this.dao.delete(id);
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async createToken(email) {
		try {
			const { token, key } = generateToken(email);
			const result = this.dao.create({ token, key, email });
			return result;
		} catch (error) {
			console.log({ ErrorCreateToken: error });
			throw new Error(error);
		}
	}
}
