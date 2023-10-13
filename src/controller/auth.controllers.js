import { recoveryService, userService } from "../service/repository/index.js";
import { verifyPassword } from "../utils.js";

export default class AuthController {
	login(req, res) {
		res.redirect("/");
	}

	register(req, res) {
		res.redirect("/");
	}

	logout(req, res) {
		req.session.destroy((err) => {
			if (!err) {
				res.redirect("/login");
			} else {
				throw new Error(err);
			}
		});
	}

	async sendEmailToRecovery(req, res) {
		const { email } = req.body;
		const result = await userService.recoveryPassword(email);
		if (!result) {
			req.session.error = "User not found";
			return res.redirect("/error-auth");
		}
		req.session.message = { sendMail: true };
		res.redirect("/recovery/sendmail/success");
	}

	async newPassword(req, res) {
		const { password, passwordConfirm } = req.body;
		try {
			const user = await userService.searchUserByEmail(req.query.email);
			if (password !== passwordConfirm) {
				req.session.error = "Fields 'password' and 'confirm password' aren't equal";
				return res.redirect("/error-auth");
			}
			if (verifyPassword(password, user.password)) {
				req.session.error = "New password is equal to old password";
				return res.redirect("/error-auth");
			}

			const updatedUser = await userService.updateUser(user._id, { password });
			const deleteToken = await recoveryService.deleteToken(req.tokenId);
			if (!updatedUser || !deleteToken) {
				throw new Error("Changed password: Inesperated error");
			}
			req.session.message = { resetSuccess: true };
			res.redirect("/recovery/recovery-password/success");
		} catch (error) {
			console.log({ errorUpdate: error });
			throw new Error();
		}
	}
}
