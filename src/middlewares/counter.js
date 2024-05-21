const { ApiCounter } = require("../api/Counter");
const { COUNTER_URL } = require("../config");

const apiCounter = new ApiCounter(COUNTER_URL);
/**
 * @type import('../../types').TController
 */
module.exports.incrementCount = async (req, res, next) => {
  try {
    await apiCounter.incrementCount(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }
  next();
};

/**
 * @type import('../../types').TController
 */
module.exports.getCounts = async (req, res, next) => {
  const { books } = req;
  const counts = {};
  try {
    await Promise.all(
      books.map((book) =>
        apiCounter.getCount(book.id).then((res) => {
          counts[book.id] = res;
        })
      )
    );
    books.forEach((book) => {
      book.countView = counts[book.id];
    });

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
