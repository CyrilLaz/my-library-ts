const { Comments } = require("../models/Comments");

/**
 * @type import('../../types').TController
 */
module.exports.getComments = async (req, res, next) => {
  const { book } = req;
  const { messages = [] } = await Comments.findOne({ book: book._id }).populate(
    "messages.user"
  )||{};
  req.book.messages = messages;
  next();
};
