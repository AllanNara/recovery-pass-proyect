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

// export function checkAdmin(req, res, next) {
// 	if (req.session?.user?.role !== "admin") {
//     return res.status(403).json({
//       status: "error",
//       code: 403,
//       message: "Forbidden",
//       error: "This site is for administrator only"
//     })
//   }
// 	next();
// }

export function existError(req, res, next) {
	if(!req.session.error) {
		res.redirect("/")
	}
	next()
}

export function errorHandler(error, req, res, next) {
	console.log({error});
	res.status(500).json({
		status: "error",
		code: error.code || 500,
		error: error.name || "INTERNAL_SERVER_ERROR",
		message: error.message || "Error not define",
	});
}
