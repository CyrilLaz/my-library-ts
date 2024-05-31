import { Document, Schema, model } from "mongoose";
import IBook from "../interfaces/Book.interface";

const bookScheme = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  authors: { type: [String], default: "" },
  favorite: { type: Boolean, default: false },
  fileCover: String,
  fileName: String,
});

export const Book = model<IBook & Document>("Book", bookScheme);
