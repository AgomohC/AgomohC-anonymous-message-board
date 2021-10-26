const { deleteThread, deleteReply } = require("./delete-requests");
const { getThread, getReplies } = require("./get-requests");
const { createThread, createReply } = require("./post-requests");
const { updateThread, updateReply } = require("./put-requests");

module.exports = {
  deleteThread,
  deleteReply,
  getThread,
  getReplies,
  createThread,
  createReply,
  updateThread,
  updateReply,
};
