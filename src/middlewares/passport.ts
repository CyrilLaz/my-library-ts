import passport from "passport";
import {
  IStrategyOptions,
  Strategy as LocalStrategy,
  VerifyFunction,
} from "passport-local";
import { User } from "../models/User";

const verify: VerifyFunction = async (name, password, done) => {
  try {
    const user = await User.findUserByCredentials(name, password);

    done(null, user);
  } catch (error) {
    done(null, false);
  }
};

const option: IStrategyOptions = {
  usernameField: "username",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(option, verify));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport as localPassport };
