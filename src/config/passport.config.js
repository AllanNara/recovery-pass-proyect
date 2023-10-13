import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../service/repository/index.js";


const initializePassport = () => {
  passport.use("login", new LocalStrategy({
    passReqToCallback: true,
    usernameField: "email",
  }, async (req, username, password, done) => {
    try {
      const user = await userService.authUser(username, password);
      if(!user) {
        req.session.error = "Invalid credentials"
        return done(null, false)
      } 
      return done(null, user)
    } catch (error) {
      console.log({error});
      return done(error)
    }
  }));

  passport.use("register", new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const registered = await userService.createUser(req.body)
      if(!registered) {
        req.session.error = "Email alredy in use"
        return done(null, false)
      } else console.log("User registered")
      return done(null, registered)
    } catch (error) {
      console.log({error});
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.readUser(id)
      return done(null, user)
    } catch (error) {
      console.log({error});
      return done(error)
    }
  });
}

export default initializePassport