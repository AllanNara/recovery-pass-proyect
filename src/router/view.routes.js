import { Router } from "express";
import ViewController from "../controller/view.controllers.js";
import { checkLogin, isNotLogged } from "../middlewares/index.js";

const viewController = new ViewController();
const router = Router();

router.get("/", checkLogin, viewController.renderProfile);

router.get("/about", viewController.renderAbout);

router.get("/login", isNotLogged, viewController.renderLogin);

router.get("/register", isNotLogged, viewController.renderRegister);

router.get("/recovery/sendmail", isNotLogged, viewController.recoveryPassword);

router.get("/recovery/new-password", viewController.recoveryWithToken);

router.get("/error-auth", viewController.renderError);

export default router;
