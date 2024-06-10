import { Document, Model, ObjectId } from "mongoose";
import { IUserDocument } from "./User.interface";

export interface IMessage {
  user: IUserDocument;
  text: string;
}

export interface IComments {
  book: ObjectId;
  messages: IMessage[];
}

export interface ICommentsDocument extends IComments, Document {}
export interface CommentsModel extends Model<IComments> {
  findComments: (bookId: string) => Promise<IMessage[]>;
}
