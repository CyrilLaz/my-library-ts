import { Container } from "inversify";
import 'reflect-metadata'
import { BookService } from "./services/Books.service";

const myContainer = new Container();
myContainer.bind(BookService).toSelf();

export { myContainer };
