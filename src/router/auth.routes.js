import { Router } from "express";
import AuthController from "../controller/auth.controllers.js";
import passport from "passport";

const authController = new AuthController();
const router = Router();

router.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/error-auth" }),
	authController.login
);

router.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "/error-auth" }),
	authController.register
);

router.post("/logout", authController.logout);
router.post("/reset/sendmail", authController.recoveryPassword);
router.post("/reset/new-password", authController.newPassword);

export default router;
