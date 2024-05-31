import express from "express";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import { createServer } from "http";
import { routers } from "./routers";
import { PORT, NODE_ENV, MONGO_URL, SESSION_SECRET } from "./config";
// import { localPassport } from "./middlewares/passport";
// import { SocketIO } from "./socket/SocketIO";
// import { SESSION_SECRET } from "./config";

const app = express();
const server = createServer(app);

// const socketIO = new SocketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: SESSION_SECRET, saveUninitialized: true, resave: false })
);

// app.use(localPassport.initialize());
// app.use(localPassport.session());
app.use((req, res, next) => {
  // req.authenticate = (...rest) => localPassport.authenticate(...rest);
  // req.socketIO = socketIO;
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routers);

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    if (NODE_ENV === "production") {
      server.listen(PORT);
    } else {
      server.listen(PORT, () => {
        console.log("Приложение запущено на порту", PORT);
      });
    }
  } catch (error) {
    console.log(error);
  }
})();
