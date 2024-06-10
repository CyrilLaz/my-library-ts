import { NextFunction, Request, Response } from "express";
import { Comments } from "../models/Comments";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { book } = req;
  const messages = await Comments.findComments(book.id);
  req.chat = { messages };
  next();
};
