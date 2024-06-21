import express from "express";
import { SESSION_SECRET } from "../config";
import session from "express-session";
import { localPassport } from "../middlewares/passport";
import path from "path";
import { routers } from "../routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);
app.use(localPassport.initialize());
app.use(localPassport.session());

app.use("/public", express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));

console.log(path.resolve(__dirname, "../views"));

app.use("/", routers);

export { app };
