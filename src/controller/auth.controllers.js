export default class AuthController {
	login(req, res) {
		res.redirect("/");
	}

	register(req, res) {
		res.redirect("/");
	}

	logout(req, res) {
		req.session.destroy((err) => {
			if(!err) {
				res.redirect("/login")
			} else {
				throw new Error(err)
			}
		})
	}

	recoveryPassword(req, res) {}

	newPassword(req, res) {}
}
