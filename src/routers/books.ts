import { createBook, editBook } from "../controllers/books";
import render from "../controllers/render/books";
import IBook from "../interfaces/Book.interface";
import { getAllBooks, getBookById } from "../middlewares/book";
// import { getComments } from "../middlewares/comments";
// import { incrementCount, getCounts } from "../middlewares/counter";

import { Router } from "express";
import { getComments } from "../middlewares/comments";
const router = Router();

router.get("/",
 getAllBooks,
//   getCounts, 
  render.renderBookListView);

router.get("/create", render.renderCreateBookView);

router.get(
  "/:id",
//   incrementCount,
  getBookById,
  getComments,
  render.renderBookView
);
router.get("/:id/update", getBookById, render.renderUpdateBookView);

router.post("/create", createBook);
router.post("/:id/update", editBook);
// router.delete("/:id", deleteBook);

export default router;
