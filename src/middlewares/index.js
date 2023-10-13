import config from "../config/config.js";
import { recoveryService, userService } from "../service/repository/index.js";

export function checkLogin(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/login");
	}
	next();
}

export function isNotLogged(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

export function existError(req, res, next) {
	if (!req.session.error) {
		res.redirect("/");
	}
	next();
}

export async function recoveryValidationToken(req, res, next) {
	const { token, email, key } = req.query;
	if (!token || !email || !key) {
		req.session.error = "Invalid Queries";
		return res.redirect("/error-auth");
	}
	
	const user = await userService.searchUserByEmail(email);
	if (!user) {
		req.session.error = "User not found";
		return res.redirect("/error-auth");
	}
	
	const tokenSaved = await recoveryService.readToken(token)
	if (!tokenSaved) {
		req.session.error = "Token invalid or has expired";
		return res.redirect("/error-auth");
	}
	req.username = user.first_name + " " + user.last_name;
	req.userId = user._id;
	req.tokenId = tokenSaved._id
	next();
}

export function pageNotFound(req, res, next) {
	console.log(req);
	res.status(404).json({
		status: "error",
		code: 404,
		error: "CLIENT_ERROR",
		message: `Page not found: ${config.apiUrl}${req.baseUrl}`,
	});
};

export function errorHandler(error, req, res, next) {
	console.log({ error });
	res.status(500).json({
		status: "error",
		code: error.code || 500,
		error: error.name || "INTERNAL_SERVER_ERROR",
		message: error.message || "Error not define",
	});
}
