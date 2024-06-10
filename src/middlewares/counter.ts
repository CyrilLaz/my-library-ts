import { ApiCounter } from "../api/Counter";
import { COUNTER_URL } from "../config";
import { TController } from "../types";

const apiCounter = new ApiCounter(COUNTER_URL);

export const incrementCount: TController = async (req, res, next) => {
  try {
    await apiCounter.incrementCount(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }
  next();
};

export const getCounts: TController = async (req, res, next) => {
  const { books } = req;
  const counts: { [K:string]: number } = {};
  try {
    await Promise.all(
      books.map((book) =>
        apiCounter.getCount(book.id).then((res) => {
          counts[book.id] = res;
        }).catch(console.log)
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
