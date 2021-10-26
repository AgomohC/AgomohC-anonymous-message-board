const { StatusCodes } = require("http-status-codes");

//import errors
const { NotFoundError } = require("../errors");

// import thread models
const Thread = require("../models/threads");
const getThread = async (req, res) => {
  const { board } = req.params;

  // find thread
  const thread = await Thread.find({ board })
    .populate({
      //populate replies array with associated replies and return the 3 most recently updated replies with the selected fields
      path: "replies",
      options: {
        sort: {
          updatedAt: "desc",
        },
      },
      perDocumentLimit: 3,
      select: "board _id text thread_id updatedAt createdAt",
    })
    .sort("-updatedAt") //sort in descending order of the updatedAt field
    .limit(10) //limit result to 10 queries
    .select("board text replies _id createdAt updatedAt"); // return the selected fields only
  if (!thread) {
    throw new NotFoundError(`something went wrong`);
  }

  return res.status(StatusCodes.OK).json(thread);
};
const getReplies = async (req, res) => {
  const {
    params: { board },
    query: { thread_id },
  } = req;

  // find a thread with all its associated replies sorted in descending order of the updated at field
  const thread = await Thread.findOne({ board, thread_id })
    .populate({
      path: "replies",
      select: "board _id text thread_id updatedAt createdAt",
      options: {
        sort: {
          updatedAt: "desc",
        },
      },
    })
    .select("board text replies _id createdAt updatedAt");
  if (!thread) {
    throw new NotFoundError(`no thread in board ${board}`);
  }
  return res.status(StatusCodes.OK).json(thread);
};

module.exports = { getThread, getReplies };
