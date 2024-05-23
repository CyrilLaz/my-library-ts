import { Container } from "inversify";
import BooksRepository from "./interfaces/BooksRepository";

const myContainer = new Container();
myContainer.bind(BooksRepository).toSelf();

export { myContainer };
