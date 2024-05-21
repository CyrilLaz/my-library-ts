/**
 *@typedef {import("../../types").TController} TController
 */

const {
  createBook,
  editBook,
  renderBookListView,
  renderCreateBookView,
  renderBookView,
  renderUpdateBookView,
} = require("../controllers/books");
const { getAllBooks, getBookById } = require("../middlewares/book");
const { getComments } = require("../middlewares/comments");
const { incrementCount, getCounts } = require("../middlewares/counter");

const router = require("express").Router();

router.get("/", getAllBooks, getCounts, renderBookListView);

router.get("/create", renderCreateBookView);

router.get("/:id", incrementCount, getBookById, getComments, renderBookView);
router.get("/:id/update", getBookById, renderUpdateBookView);

router.post("/create", createBook);
router.post("/:id/update", editBook);
// router.delete("/:id", deleteBook);

module.exports.booksRouter = router;
