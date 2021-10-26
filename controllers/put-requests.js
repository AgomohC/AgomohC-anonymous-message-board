// import errors
const { BadRequestError, NotFoundError } = require("../errors");

const { StatusCodes } = require("http-status-codes");

//import mongoose models
const Thread = require("../models/threads");
const Reply = require("../models/replies");

const updateThread = async (req, res) => {
  const { board, thread_id } = req.body;

  // input validation
  if (!board || !thread_id) {
    throw new BadRequestError(`required fields are missing`);
  }

  // find thread and update
  const reportedThread = await Thread.findOneAndUpdate(
    { board, _id: thread_id },
    { reported: true },
    { new: true }
  );
  if (!reportedThread) {
    throw new NotFoundError(`no thread with id ${thread_id} in board ${board}`);
  }
  return res.status(StatusCodes.OK).json({ message: "success" });
};

const updateReply = async (req, res) => {
  const { board, thread_id, reply_id } = req.body;

  // input validation
  if (!board || !thread_id || !reply_id) {
    throw new BadRequestError(`required fields are missing`);
  }

  //  report reply
  const reportedThread = await Reply.findOneAndUpdate(
    { board, _id: reply_id, thread_id },
    { reported: true },
    { new: true }
  );

  // handle errors
  if (!reportedThread) {
    throw new NotFoundError(`no thread with id ${thread_id} in board ${board}`);
  }
  return res.status(StatusCodes.OK).json({ message: "success" });
};

module.exports = { updateThread, updateReply };
