import IBook from "./Book.interface";

export abstract class BooksRepository {
  abstract createBook(book: IBook): Promise<IBook>; // создание книги.
  abstract getBook(id: string): Promise<IBook>; // получение книги по id.
  abstract getBooks(): Promise<IBook[]>; // получение всех книг.
  abstract updateBook(id: string): Promise<IBook>; // обновление книги.
  abstract deleteBook(id: string): Promise<void>; // удаление книги.
}
