import { NextFunction, Response, Request } from "express";
import IBook from "../interfaces/Book.interface";

import { myContainer } from "../container.js";
import { BooksRepository } from "../interfaces/BooksRepository.js";
import { Book } from "../models/Book";
import { BookService } from "../services/Books.service";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookRepo = myContainer.get(BookService);
  console.log(bookRepo);
  
  try {
    const books = await bookRepo.getBooks();
    req.books = books;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const bookRepo = myContainer.get(BookService);
  try {
    const book = await bookRepo.getBook(id);
    req.book = book;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
