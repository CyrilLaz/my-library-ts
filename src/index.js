"use strict";
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const http = require("http");
const { routers } = require("./routers");
const { PORT, NODE_ENV, MONGO_URL, SESSION_SECRET } = require("./config");
const { localPassport } = require("./middlewares/passport");
const { SocketIO } = require("./socket/SocketIO");

const app = express();
const server = http.createServer(app);

const socketIO = new SocketIO(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: SESSION_SECRET }));

app.use(localPassport.initialize());
app.use(localPassport.session());
app.use((req, res, next) => {
  req.authenticate = (...rest) => localPassport.authenticate(...rest);
  req.socketIO = socketIO;
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
