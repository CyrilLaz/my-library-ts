import { Document } from "mongoose";

export default interface IBook {
  title: string;
  description?: string;
  authors?: string[];
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
}

export interface IBookDocument extends IBook, Document {
  countView?: number;
}
