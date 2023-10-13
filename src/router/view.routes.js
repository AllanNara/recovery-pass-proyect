import { Router } from "express";
import ViewController from "../controller/view.controllers.js";
import { checkLogin, isNotLogged, existError, recoveryValidationToken } from "../middlewares/index.js";

const viewController = new ViewController();
const router = Router();

router.get("/", checkLogin, viewController.renderProfile);

router.get("/about", viewController.renderAbout);

router.get("/login", isNotLogged, viewController.renderLogin);

router.get("/register", isNotLogged, viewController.renderRegister);

router.get("/recovery/sendmail", isNotLogged, viewController.recoveryPassword);

router.get("/recovery/sendmail/success", isNotLogged, viewController.renderSuccess);

router.get("/recovery/recovery-password", recoveryValidationToken, viewController.recoveryWithToken);

router.get("/recovery/recovery-password/success", viewController.renderSuccess);

router.get("/error-auth", existError, viewController.renderError);

export default router;
