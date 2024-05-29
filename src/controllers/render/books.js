/**
 *@typedef {import("../../../types.js").TController} TController
 */

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
  if (!book) {
    res.status(404).send();
    return;
  }
  res.render("book/update", { title: "Изменить информацию о книге", book });
};

module.exports = {
  renderUpdateBookView,
  renderBookView,
  renderCreateBookView,
  renderBookListView,
};
