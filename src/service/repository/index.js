import UserService from "../user.service.js";
import UserDAO from "../../dao/UserDAO.js";
import RecoveryService from "../recovery.service.js";
import TokenDAO from "../../dao/TokenDAO.js";

export const userService = new UserService(new UserDAO());
export const recoveryService = new RecoveryService(new TokenDAO())