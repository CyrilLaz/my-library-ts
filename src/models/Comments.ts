import { Document, Schema, model } from "mongoose";
import {
  CommentsModel,
  IComments,
} from "../interfaces/Comments.interface";

const commentsScheme = new Schema<IComments, CommentsModel>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    messages: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { versionKey: false }
);

commentsScheme.statics = {
  findComments: async function (bookId: string) {
    const { messages = [] } =
      (await this.findOne({ book: bookId }).populate("messages.user")) || {};
    return messages;
  },
};
export const Comments = model<IComments, CommentsModel>(
  "comments",
  commentsScheme
);
