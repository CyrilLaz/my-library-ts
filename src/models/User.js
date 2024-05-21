const { Schema, model } = require("mongoose");

const userScheme = new Schema({
  __v: { type: Number, select: false },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

userScheme.statics = {
  async isUnique(username) {
    const user = await this.findOne({ username });
    return !user;
  },
  async findUserByCredentials(username, password) {
    const user = await this.findOne({ username }).select("+password");
    if (!user || user.password !== password) {
      throw new Error("Ошибка авторизации");
    }
    return user;
  },
  async createNewUser(username, password) {
    if (!(await this.isUnique(username))) {
      throw new Error("Пoльзователь с таким именем уже существует");
    }
    const newUser = new this({ username, password });
    await newUser.save();
    return newUser;
  },
};

module.exports.User = model("User", userScheme);
