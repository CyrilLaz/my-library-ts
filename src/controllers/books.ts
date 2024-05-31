import { NextFunction, Request, Response } from "express";
import { myContainer } from "../container";
import { BooksRepository } from "../interfaces/BooksRepository.js";
import { BookService } from "../services/Books.service";
// import { Book } from "../models/Book.js";

const createBook = async (req:Request, res:Response, next:NextFunction) => {
  const { body } = req;

  if (!body.title) {
    res.status(400).json({ error: "No Title" });
    return;
  }
  const bookRepo = myContainer.get(BookService);
  try {
    await bookRepo.createBook(body);
    res.redirect("/books");
  } catch (error) {
    res.status(500).json(error);
  }
};

const downloadBookById = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  const bookRepo = myContainer.get(BookService);

  try {
    const book = await bookRepo.getBook(id);
    if (!book) {
      res.status(404).send({ error: "file not exist" });
      return;
    }

    // res.download(file.fileBook, file.fileName, (err) => {
    //   if (err) {
    //     res.status(500).send({ error: "Error File" });
    //   }
    // });
  } catch (error) {
    res.status(500).send(error);
  }
};

const editBook = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { body } = req;

  const bookRepo = myContainer.get(BookService);

  if (!body.favorite) {
    body.favorite = false;
  }

  try {
    await bookRepo.updateBook(id, body);
    res.redirect(`/books/${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBook = async (req:Request, res:Response) => {
  const { id } = req.params;

  const bookRepo = myContainer.get(BookService);
  try {
    await bookRepo.deleteBook(id);
    res.send("ok");
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  downloadBookById,
  createBook,
  editBook,
  deleteBook,
};
