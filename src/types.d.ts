import { IBookDocument } from "./interfaces/Book.interface";
import { IComments, IMessage } from "./interfaces/Comments.interface";
import { IUserDocument } from "./interfaces/User.interface";
import { SocketIO } from "./socket/SocketIO";

type TBook = Record<"book", IBookDocument>;
type TBooks = Record<"books", IBookDocument[]>;

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = T | U extends object
//   ? (Without<T, U> & U) | (Without<U, T> & T)
//   : T | U;

declare global {
  namespace Express {
    interface User extends IUserDocument {}
    interface Request extends Partial<TBook & TBooks>, IUserDocument {
      chat?: Omit<IComments, "book">;
      socketIO?: SocketIO;
    }
  }
}
