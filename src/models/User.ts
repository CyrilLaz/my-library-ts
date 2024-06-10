import { IUser } from "../interfaces/User.interface";
import { UserModel } from "./User.model";

import { Model, Schema, model } from "mongoose";

const userScheme = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { versionKey: false }
);

userScheme.statics = {
  async isUnique(username: string) {
    const user = await this.findOne({ username });
    return !user;
  },
  async findUserByCredentials(username: string, password: string) {
    const user = await this.findOne({ username }).select("+password");
    if (!user || user.password !== password) {
      throw new Error("Ошибка авторизации");
    }
    return user;
  },
  async createNewUser(username: string, password: string) {
    if (!(await this.isUnique(username))) {
      throw new Error("Пoльзователь с таким именем уже существует");
    }
    const newUser = new this({ username, password });
    await newUser.save();
    return newUser;
  },
};

const User = model<IUser, UserModel>("User", userScheme);
export { User };
