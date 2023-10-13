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

	recoveryWithToken(req, res) {
		res.render("new-password");
	}

	renderError(req, res) {
		res.render("error", { message: req.session.error })
	} 
}
