import { createHash, isValidPassword } from "../utils.js"

export default class UserService {
	constructor(dao) {
		this.dao = dao;
	}

	async authUser(email, password) {
		try {
			const user = await this.dao.get(email);
			if (!user || !isValidPassword(password, user.password)) return null
			else return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async readUser(id) {
		try {
			const user = await this.dao.get(id);
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async createUser({ first_name, last_name, email, password, role }) {
		try {
			const existingUser = await this.dao.get(email);

			if (existingUser) return null

			const hashedPassword = createHash(password);
			const userCreated = await this.dao.create({
				first_name,
				last_name,
				email,
				password: hashedPassword,
				role,
			});
			return userCreated;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async updateUser(id, user) {
		try {
			if (user.password) {
				user.password = createHash(user.password)
			}
			const userUpdated = await this.dao.update(id, user);
			return userUpdated;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async deleteUser(id) {
		try {
			const userDeleted = await this.dao.delete(id);
			return userDeleted;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
