/**
 *@typedef {import("../../types.js").TController} TController
 */

const { Book } = require("../models/Book");

/**@type TController */
module.exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    req.books = books;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

/**@type TController */
module.exports.getBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    req.book = book.toObject();
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
