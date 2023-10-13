import path from "path"
import express from "express";
import session from "express-session";
import hbs from "express-handlebars"
import passport from "passport";
import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import authRouter from "./router/auth.routes.js";
import viewsRouter from "./router/view.routes.js";
import { __dirname, connectMongo } from "./utils.js";
import { errorHandler, pageNotFound } from "./middlewares/index.js";

const app = express();
const optSession = {
  secret: "shhhh",
  resave: false,
  saveUninitialized: false,
}

app.engine("handlebars", hbs.engine())
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");
app.use(session(optSession));
initializePassport()

app.use(passport.initialize());
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter)
app.use("/", viewsRouter)
app.use("*", pageNotFound)
app.use(errorHandler)


await connectMongo();
app.listen(config.port, () => console.log(`Listening on port ${config.port}`))