import config from "../config/config.js";
import { createHash, verifyPassword, transport } from "../utils.js"
import { recoveryService } from "./repository/index.js";

export default class UserService {
	constructor(dao) {
		this.dao = dao;
	}

	async authUser(email, password) {
		try {
			const user = await this.dao.get(email);
			if (!user || !verifyPassword(password, user.password)) return null
			else return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async readUser(id) {
		try {
			const user = await this.dao.read(id);
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async recoveryPassword(email) {
		try {
			const found = await this.searchUserByEmail(email)
			if(!found) return null
			
			const name = found.first_name + " " + found.last_name
			const createToken = await recoveryService.createToken(email)
			const { token, email: emailRegistered, key} = createToken
	
			const result = await transport.sendMail({
				from: `no-reply <${config.mailer.email}>`,
				to: email,
				subject: "Reestablecer contraseñá - Proyecto",
				html: `
					<div>
						<h4>¡Hola ${name}!</h4>
						<p>Ingresa al siguiente link para poder restablecer tu contraseña: </p>
						<a href="${config.apiUrl}/recovery/recovery-password?token=${token}&email=${emailRegistered}&key=${key}">Cambiar contraseñá</a>
						<p>O copia y pega el siguiente enlace en tu navegador:</p>
						<span>${config.apiUrl}/recovery/recovery-password?token=${token}&email=${emailRegistered}&key=${key}</span>

						<p>Recuerda no compartir este link con nadie</p>
						<p>Si crees que se trata de un error, puedes ignorar este correo</p>
					</div>
					`,
			});

			return result
		} catch (error) {
			console.log({ ErrorSendMail: error })
			throw new Error(error)
		}

	}

	async searchUserByEmail(email) {
		try {
			const user = await this.dao.get(email);
			if(!user) return null;
			return user
		} catch (error) {
			console.log(error);
			return null
		}
	}

	async createUser({ first_name, last_name, email, password, role = "user"}) {
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
