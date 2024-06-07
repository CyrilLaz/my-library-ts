import { Model } from "mongoose";
import { IUser, IUserDocument } from "./User.interface";

export interface UserModel extends Model<IUser> {
  isUnique(username: string): Promise<boolean>;
  findUserByCredentials(username: string, password: string): Promise<IUserDocument>;
  createNewUser(username: string, password: string): Promise<IUserDocument>;
}
