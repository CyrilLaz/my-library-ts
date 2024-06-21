import { Container } from "inversify";
import "reflect-metadata";
import { BookService } from "../services/Books.service";
import { SocketIO } from "../socket/SocketIO";

const myContainer = new Container();

myContainer.bind(BookService).toSelf();
myContainer.bind(SocketIO).toSelf()

export { myContainer };
