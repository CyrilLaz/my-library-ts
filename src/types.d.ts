// import { IRouterHandler } from "express";

import IBook from "./interfaces/Book.interface";

type TBook = Record<"book", IBook>;
type TBooks = Record<"books", IBook[]>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

// export interface TController extends IRouterHandler {(
//   req: import("express").Request &
//     XOR<TBook, TBooks> &
//     XOR<{ user: any }, null>,
//   res: import("express").Response,
//   next?: import("express").NextFunction
// ) => void};

// export interface IBook {
//   _id: string;
//   title: string;
//   description: string;
//   authors: string;
//   favorite: boolean;
//   fileCover: string;
//   fileName: string;
//   fileBook: string;
//   countView: number;
// }

// declare namespace Express {
//   export interface Request extends XOR<TBook, TBooks> {}
// }

declare global {
  namespace Express {
    interface Request extends Partial<TBook&TBooks> {
      user?: any;
    }
  }
}
