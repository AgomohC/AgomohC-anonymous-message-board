const { StatusCodes } = require("http-status-codes");

//import mongoose models
const Thread = require("../models/threads");
const Replies = require("../models/replies");

// import error
const { NotFoundError } = require("../errors");
const createThread = async (req, res) => {
  // create new thread
  const newThread = await Thread.create(req.body);

  let returnedObj = {
    board: newThread.board,
    _id: newThread._id,
    text: newThread.text,
    replies: newThread.replies,
    reported: newThread.reported,
    bumped_on: newThread.updatedAt,
    created_on: newThread.createdAt,
  };

  return res.status(StatusCodes.CREATED).json(returnedObj);
};

const createReply = async (req, res) => {
  const { board, thread_id } = req.body;

  //create new reply
  const newReply = await Replies.create(req.body);

  const replyObj = {
    _id: newReply._id,
    text: newReply.text,
    created_on: newReply.createdAt,
    reported: newReply.reported,
  };

  // add reply to its associated thread

  const threadUpdate = await Thread.findOneAndUpdate(
    { board, _id: thread_id },
    { $push: { replies: replyObj._id } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!threadUpdate) {
    throw new NotFoundError(
      `thread with id ${thread_id} in board ${board} not found`
    );
  }

  return res.status(StatusCodes.CREATED).json(replyObj);
};

module.exports = { createThread, createReply };
