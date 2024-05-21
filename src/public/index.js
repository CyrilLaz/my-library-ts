const socket = io.connect();

const commentsBlock = document.querySelector("#commentsBlock");
const comments = commentsBlock.querySelector(".comments");
const formComment = commentsBlock.querySelector("#form");
const inputComment = formComment.querySelector("#message");

const tmpMsg = (msg) =>
  `<div class="comment p-3 border rounded mb-2">
<span class="username">${msg.user.username}</span>
<p>${msg.message}</p>
</div>`;

socket.on("message-to-comments", (msg) => {
  console.log(msg);

  const msgBlock = tmpMsg(msg);
  comments.insertAdjacentHTML("beforeend", msgBlock);
});

formComment.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputComment.value.length > 0) {
    socket.emit("message-to-comments", { message: inputComment.value });
    inputComment.value = "";
  }
});
