const { Comments } = require("../models/Comments");

module.exports.SocketIO = class {
  constructor(server) {
    this.io = new (require("socket.io").Server)(server);
  }
  #user = {};

  /**@param {{user:{_id:string},message:string}} msg*/
  async #pushComment(msg, bookId) {
    const newMsg = { user: msg.user._id, text: msg.message };
    try {
      let comment = await Comments.findOne({ book: bookId });
      if (!comment) {
        comment = new Comments({ book: bookId, messages: [newMsg] });
      } else {
        comment.messages.push(newMsg);
      }
      await comment.save();
    } catch (error) {
      console.log(error);
    }
  }

  initCommentsConnection(bookIdRoom, user) {
    this.io.once("connection", (socket) => {
      const { id } = socket;
      // console.log("connection ", id);

      socket.join(bookIdRoom);

      socket.on("message-to-comments", async (msg) => {
        msg.user = user;
        await this.#pushComment(msg, bookIdRoom);
        socket.to(bookIdRoom).emit("message-to-comments", msg);
        socket.emit("message-to-comments", msg);
      });

      socket.on("disconnect", () => {
        // console.log("disconnect ", id);
      });
    });

    return this;
  }
};
