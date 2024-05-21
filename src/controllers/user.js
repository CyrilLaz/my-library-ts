/**
 *@typedef {import("../../types").TController} TController
 */

/**@type TController */
const auth = (req, res) => {
  res.status(201).send({ id: 1, mail: "test@mail.ru" });
};

module.exports = { auth };
