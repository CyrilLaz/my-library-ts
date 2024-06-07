
import IBook from "./interfaces/Book.interface";
import { IUserDocument } from "./interfaces/User.interface";

type TBook = Record<"book", IBook>;
type TBooks = Record<"books", IBook[]>;

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = T | U extends object
//   ? (Without<T, U> & U) | (Without<U, T> & T)
//   : T | U;

declare global {
  namespace Express {
    interface User extends IUserDocument {}
    interface Request extends Partial<TBook & TBooks>, IUserDocument {}
  }
}
