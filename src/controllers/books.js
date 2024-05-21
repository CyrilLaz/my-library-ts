/**
 *@typedef {import("../../types.js").TController} TController
 */
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
  console.log(body);
  if (!body.title) {
    res.status(400).json({ error: "No Title" });
    return;
  }

  const newBook = new Book(body);
  try {
    await newBook.save();
    res.redirect("/books");
  } catch (error) {
    res.status(500).json(error);
  }
};

/**@type TController */
const downloadBookById = (req, res, next) => {
  const { id } = req.params;

  const file = req.db.books.find((book) => book.id === id);

  if (!file) {
    res.status(404).send({ error: "file not exist" });
    return;
  }
  res.download(file.fileBook, file.fileName, (err) => {
    if (err) {
      res.status(500).send({ error: "Error File" });
    }
  });
};
/**@type TController */
const editBook = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!body.favorite) {
    body.favorite = false;
  }

  try {
    await Book.findByIdAndUpdate(id, body);
    res.redirect(`/books/${id}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**@type TController */
const deleteBook = (req, res) => {
  const { id } = req.params;
  const idx = db.books.findIndex((book) => book.id === id);

  if (!~idx) {
    res.status(404).send();
    return;
  }
  db.books.splice(idx, 1);
  res.send("ok");
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
