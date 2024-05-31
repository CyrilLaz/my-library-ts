import { Request, Response } from "express";
import IBook from "../../interfaces/Book.interface";

const renderBookListView = (
  req: Request,
  res: Response
) => {
  const { books } = req;
  res.render("book/index", { books, title: "Список всех книг" });
};

const renderCreateBookView = (req: Request, res: Response) => {
  res.render("book/create", { title: "Новая книга" });
};

const renderBookView = (
  req: Request,
  res: Response
) => {
  const { book, user } = req;
  if (!book) {
    res.status(404).send();
    return;
  }

  // req.socketIO.initCommentsConnection(book._id.toString(), user);
  res.render("book/view", { title: "Информация о книге", book });
};

const renderUpdateBookView = (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { book } = req;
  if (!book) {
    res.status(404).send();
    return;
  }
  res.render("book/update", { title: "Изменить информацию о книге", book });
};

export default {
  renderUpdateBookView,
  renderBookView,
  renderCreateBookView,
  renderBookListView,
};
