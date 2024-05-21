const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/User");

const verify = async (name, password, done) => {
  //   let user;
  try {
    const user = await User.findUserByCredentials(name, password);
    done(null, user);
  } catch (error) {
    done(null, false);
  }
};

const option = {
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

module.exports.localPassport = passport;
