import { Router } from "express";
import { User } from "../../models/User";
import { localPassport } from "../../middlewares/passport";

const router = Router();

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
// authenticate
router.post(
  "/login",
  localPassport.authenticate("local", { failureRedirect: "/api/user/login" }),
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
  } catch (err) {
    res.status(400).json(err);
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

export default router;
