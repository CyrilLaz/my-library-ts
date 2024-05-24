/**
 *@typedef {import("../../types.js").TController} TController
 */
const { myContainer } = require("../container.js");
const { BooksRepository } = require("../interfaces/BooksRepository.js");
const { Book } = require("../models/Book.js");

/**@type TController */
const renderBookListView = (req, res) => {
  const { books } = req;
  res.render("book/index", { books, title: "Список всех книг" });
};

/**@type TController */
const renderCreateBookView = (req, res) => {
  res.render("book/create", { title: "Новая книга" });
};

/** @type TController */
const renderBookView = (req, res) => {
  const { book, user } = req;
  if (!book) {
    res.status(404).send();
    return;
  }

  req.socketIO.initCommentsConnection(book._id.toString(), user);
  res.render("book/view", { title: "Информация о книге", book });
};

/** @type TController */
const renderUpdateBookView = (req, res) => {
  const { id } = req.params;
  const { book } = req;
  // const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send();
    return;
  }
  res.render("book/update", { title: "Изменить информацию о книге", book });
};

/**@type TController */
const createBook = async (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    res.status(400).json({ error: "No Title" });
    return;
  }
  const bookRepo = myContainer.get(BooksRepository);
  try {
    await bookRepo.createBook(body);
    res.redirect("/books");
  } catch (error) {
    res.status(500).json(error);
  }
};

/**@type TController */
const downloadBookById = async (req, res, next) => {
  const { id } = req.params;
  const bookRepo = myContainer.get(BooksRepository);

  try {
    const book = await bookRepo.getBook(id);
    if (!book) {
      res.status(404).send({ error: "file not exist" });
      return;
    }

    res.download(file.fileBook, file.fileName, (err) => {
      if (err) {
        res.status(500).send({ error: "Error File" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
/**@type TController */
const editBook = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const bookRepo = myContainer.get(BooksRepository);

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

/**@type TController */
const deleteBook = async (req, res) => {
  const { id } = req.params;

  const bookRepo = myContainer.get(BooksRepository);
  try {
    await bookRepo.deleteBook(id);
    res.send("ok");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  renderUpdateBookView,
  renderBookView,
  renderCreateBookView,
  renderBookListView,
  downloadBookById,
  createBook,
  editBook,
  deleteBook,
};
