import config from "./config/config.js";

//// DIRNAME ////

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//// MONGODB CONNECT ////

import mongoose from "mongoose";

export async function connectMongo() {
	try {
		await mongoose.connect(config.mongoUri);
		console.log(`Connect mongoDB successfully`);
	} catch (err) {
		console.log(`Fatal error MONGODB: ${err}`);
	}
}

//// JSON WEB TOKEN ////

import jwt from "jsonwebtoken";

export function generateToken(user) {
	const token = jwt.sign({ user }, config.secretJWT, { expiresIn: "1h" });
	return token;
}

export function verifyToken(token) {
	const result = jwt.verify(token, config.secretJWT);
	return result;
}

//// BRCYPT ////

import bcrypt from "bcrypt";
export function createHash(password) {
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	return passwordHash
}

export function isValidPassword(password, hashPassword) {
	const isValid = bcrypt.compareSync(password, hashPassword);
	return isValid
}

//// NODEMAILER ////

import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
	service: config.mailer.service,
	port: config.mailer.port,
	auth: {
		user: config.mailer.email,
		pass: config.mailer.pass,
	},
});

//// FAKE USER ////

// export const fakeUser = {
// 	first_name: "John",
// 	last_name: "Doe",
// 	email: "johndoe@mail.com",
// 	role: "admin",
// 	password: "unodoscuatro",
// };
