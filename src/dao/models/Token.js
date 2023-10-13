import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
	token: String,
	key: String,
	email: String,
	expiresAt: { type: Date, default: Date.now, index: { expires: "1h" } },
});

const tokenModel = model("recovery-tokens", tokenSchema);

export default tokenModel;
