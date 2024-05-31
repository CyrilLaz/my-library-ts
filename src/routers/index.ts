import { Router } from "express";
import { notFound } from "../controllers/404";
// import { apiRouters } from "./api";
import  booksRouter  from "./books";
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/books");
});

// api
// router.use("/api", apiRouters);

// book router
router.use(
  "/books",
  (req, res, next) => {
    // if (!req.isAuthenticated()) {
    //   return res.redirect("/api/user/login");
    // }
    next();
  },
  booksRouter
);


router.use(notFound);

export {router as routers};
