import { Request, Response } from "express";

export const notFound = (req:Request, res:Response) => {
  // next({ statusCode: 404, message: "404 | NotFound" });

  res.status(404).send("404 | NotFound");
};
