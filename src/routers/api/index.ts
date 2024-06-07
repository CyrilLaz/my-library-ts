import userRouter from "./user";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);

export { router as apiRouters };
