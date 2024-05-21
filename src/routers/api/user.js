const { User } = require("../../models/User");

const router = require("express").Router();

router.get(
  "/login",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/api/user/me");
    }
    next();
  },
  (req, res) => {
    res.render("user/login", { title: "Вход/Регистрация" });
  }
);

router.get(
  "/me",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log("не авторизован");
      return res.redirect("/api/user/login");
    }
    next();
  },
  (req, res) => {
    const { user } = req;
    res.render("user/profile", { title: "Profile", user });
  }
);

router.post(
  "/login",
  (req, res, next) =>
    req.authenticate("local", { failureRedirect: "/api/user/login" })(
      req,
      res,
      next
    ),
  (req, res) => {
    // получение данных для входа
    res.redirect("/books");
  }
);

router.post("/signup", async (req, res) => {
  // регистрация нового usr
  const { username, password } = req.body;
  try {
    await User.createNewUser(username, password);
    return res.redirect("/api/user/login");
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.redirect("/api/user/login");
  });
});

module.exports.userRouter = router;
