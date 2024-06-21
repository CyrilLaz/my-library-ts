import { Request, Response } from "express";
import IBook from "../../interfaces/Book.interface";
import { myContainer } from "../../infrastructure/container";
import { SocketIO } from "../../socket/SocketIO";
import { server } from "../../infrastructure/server";

const renderBookListView = (req: Request, res: Response) => {
  const { books } = req;
  res.render("book/index", { books, title: "Список всех книг" });
};

const renderCreateBookView = (req: Request, res: Response) => {
  res.render("book/create", { title: "Новая книга" });
};

const renderBookView = (req: Request, res: Response) => {
  const { book, user, chat } = req;
  if (!book) {
    res.status(404).send();
    return;
  }
  // new SocketIO(server).initCommentsConnection(book._id.toString(), user);
  myContainer.get(SocketIO).initCommentsConnection(book._id.toString(), user);
  res.render("book/view", { title: "Информация о книге", book, chat });
};

const renderUpdateBookView = (req: Request, res: Response) => {
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
