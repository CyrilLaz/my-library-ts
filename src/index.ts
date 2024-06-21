import mongoose from "mongoose";
import { PORT, NODE_ENV, MONGO_URL } from "./config";

import { server } from "./infrastructure/server";

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
