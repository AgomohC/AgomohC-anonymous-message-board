const { StatusCodes } = require("http-status-codes");

//handles not existent routes
const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
};
module.exports = notFound;
