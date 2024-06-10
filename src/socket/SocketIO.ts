import { Comments } from "../models/Comments";
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { IComments, IMessage } from "../interfaces/Comments.interface";
import { IUser, IUserDocument } from "../interfaces/User.interface";

export class SocketIO {
  private io: Server;
  constructor(
    server: HttpServer<typeof IncomingMessage, typeof ServerResponse>
  ) {
    this.io = new Server(server);
  }

  async #pushComment(msg: IMessage, bookId: string) {
    try {
      let comment = await Comments.findOne({ book: bookId });
      if (!comment) {
        comment = new Comments({ book: bookId, messages: [msg] });
      } else {
        comment.messages.push(msg);
      }
      await comment.save();
    } catch (error) {
      console.log(error);
    }
  }

  initCommentsConnection(bookIdRoom: string, user: IUserDocument) {
    console.log(bookIdRoom);

    this.io.once("connection", (socket) => {
      const { id } = socket;
      console.log("connection ", id);

      socket.join(bookIdRoom);

      socket.on("message-to-comments", async (msg: { message: string }) => {
        const newMsg: IMessage = { text: msg.message, user };

        await this.#pushComment(newMsg, bookIdRoom);
        socket
          .to(bookIdRoom)
          .emit("message-to-comments", { ...msg, user } satisfies {
            user: typeof user;
            message: string;
          });
        socket.emit("message-to-comments", { ...msg, user } satisfies {
          user: typeof user;
          message: string;
        });
      });

      socket.on("disconnect", () => {
        // console.log("disconnect ", id);
      });
    });

    return this;
  }
}
