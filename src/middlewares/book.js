/**
 *@typedef {import("../../types.js").TController} TController
 */

const { myContainer } = require("../container.js");
const { BooksRepository } = require("../interfaces/BooksRepository.js");
const { Book } = require("../models/Book");

/**@type TController */
module.exports.getAllBooks = async (req, res, next) => {
  const bookRepo = myContainer.get(BooksRepository);
  try {
    const books = await bookRepo.getBooks();
    req.books = books;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

/**@type TController */
module.exports.getBookById = async (req, res, next) => {
  const { id } = req.params;
  const bookRepo = myContainer.get(BooksRepository);
  try {

    const book = await bookRepo.getBook(id);
    req.book = book.toObject();
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
