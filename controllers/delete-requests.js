//import mongoose models
const Thread = require("../models/threads");
const Reply = require("../models/replies");

// import errors
const {
  NotFoundError,
  UnauthenticatedError,
  BadRequestError,
} = require("../errors/index");

const deleteThread = async (req, res) => {
  const { board, thread_id, delete_password } = req.body;

  //input validation
  if (!board || !thread_id || !delete_password) {
    throw new BadRequestError(`required fields missing`);
  }

  //find thread to delete
  const isThread = await Thread.findOne({ board, _id: thread_id });
  if (!isThread) {
    throw new NotFoundError(`No thread in board ${board} with id ${thread_id}`);
  }

  //compare password
  const isMatch = await isThread.comparePasswords(delete_password);
  if (!isMatch) {
    throw new UnauthenticatedError(`incorrect password`);
  }

  //delete thread
  await Thread.findOneAndDelete({ board, _id: thread_id });
  return res.status(200).json({ message: "success" });
};
const deleteReply = async (req, res) => {
  const { board, thread_id, reply_id, delete_password } = req.body;

  //input validation
  if (!board || !thread_id || !reply_id || !delete_password) {
    throw new BadRequestError(`required fields missing`);
  }

  // find reply
  const isReply = await Reply.findOne({ board, thread_id, _id: reply_id });
  if (!isReply) {
    throw new NotFoundError(
      `No reply in thread ${thread_id} with id ${reply_id}`
    );
  }

  //compare password
  const isMatch = await isReply.comparePasswords(delete_password);
  if (!isMatch) {
    throw new UnauthenticatedError(`incorrect password`);
  }

  //delete reply
  await Reply.findOneAndUpdate(
    { board, thread_id, _id: reply_id },
    { text: "[deleted]" },
    { new: true }
  );
  return res.status(200).json({ message: "success" });
};

module.exports = { deleteThread, deleteReply };
