import { Router } from "express";
import AuthController from "../controller/auth.controllers.js";
import passport from "passport";
import { recoveryValidationToken } from "../middlewares/index.js";

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
router.post("/reset/sendmail", authController.sendEmailToRecovery);
router.post("/reset/new-password", recoveryValidationToken, authController.newPassword);

export default router;
