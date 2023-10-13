import UserDTO from "../dto/user.dto.js";

export default class ViewController {
	renderProfile(req, res) {
		const user = new UserDTO(req.user)
		res.render("home", { user });
	}

	renderAbout(req, res) {
		res.render("about");
	}

	renderLogin(req, res) {
		res.render("login");
	}

	renderRegister(req, res) {
		res.render("register");
	}

	recoveryPassword(req, res) {
		res.render("recovery-sendmail");
	}

	renderSuccess(req, res) {
		let message = req.session.message
		if(message) {
			if(message.sendMail || message.resetSuccess) {
				return res.render("success", { message: req.session.message });
			}
		}
		res.redirect("/")
	}

	recoveryWithToken(req, res) {
		const { token, key, email } = req.query
		res.render("new-password", { username: req.username, token, key, email } );
	}

	renderError(req, res) {
		res.render("error", { error: req.session.error })
	} 
}
