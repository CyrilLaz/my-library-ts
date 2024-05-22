import IBook from "./Book.interface";

export default abstract class BooksRepository {
  abstract createBook(book: IBook): IBook; // создание книги.
  abstract getBook(id: string): IBook; // получение книги по id.
  abstract getBooks(): IBook[]; // получение всех книг.
  abstract updateBook(id: string): IBook; // обновление книги.
  abstract deleteBook(id: string): void; // удаление книги.
}
