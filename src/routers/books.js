const { createBook, editBook } = require("../controllers/books");
const render = require("../controllers/render/books");
const { getAllBooks, getBookById } = require("../middlewares/book");
const { getComments } = require("../middlewares/comments");
const { incrementCount, getCounts } = require("../middlewares/counter");

const router = require("express").Router();

router.get("/", getAllBooks, getCounts, render.renderBookListView);

router.get("/create", render.renderCreateBookView);

router.get("/:id", incrementCount, getBookById, getComments, render.renderBookView);
router.get("/:id/update", getBookById, render.renderUpdateBookView);

router.post("/create", createBook);
router.post("/:id/update", editBook);
// router.delete("/:id", deleteBook);

module.exports.booksRouter = router;
