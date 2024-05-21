const { Schema, model } = require("mongoose");

const commentsScheme = new Schema({
  __v: { type: Number, select: false },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  messages: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports.Comments = model("comments", commentsScheme);
