import dotenv from "dotenv"
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mailer: {
    service: "gmail",
    port: 583,
    email: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
  apiUrl: process.env.API_URL,
  secretJWT: process.env.SECRET_JWT,
}