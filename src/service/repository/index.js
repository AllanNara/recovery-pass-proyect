import UserService from "../user.service.js";
import UserDAO from "../../dao/UserDAO.js";

export const userService = new UserService(new UserDAO())