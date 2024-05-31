import { injectable } from "inversify";
import IBook from "../interfaces/Book.interface";
import { BooksRepository } from "../interfaces/BooksRepository";
import { Book } from "../models/Book";

@injectable()
export class BookService extends BooksRepository {
  async createBook(book: IBook): Promise<IBook> {
    const newBook = new Book(book);
    try {
      await newBook.save();
      return newBook;
    } catch (error) {
      throw error;
    }
  }
  async getBooks(): Promise<IBook[]> {
    try {
      const books = await Book.find();
      return books;
    } catch (error) {
      throw error;
    }
  }
  async deleteBook(id: string): Promise<void> {}
  async getBook(id: string): Promise<IBook> {
    try {
      const book = await Book.findById(id);
      return book;
    } catch (error) {
      throw error;
    }
  }
  async updateBook(id: string, obj: Partial<IBook>): Promise<IBook> {
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, obj);
      return updatedBook;
    } catch (error) {
      throw error;
    }
  }
}
