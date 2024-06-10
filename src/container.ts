import { Container } from "inversify";
import 'reflect-metadata'
import { BooksRepository } from "./interfaces/BooksRepository";
import { BookService } from "./services/Books.service";
import { SocketIO } from "./socket/SocketIO";

const myContainer = new Container();
myContainer.bind(BookService).toSelf();

export { myContainer };
