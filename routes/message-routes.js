const router = require("express").Router();

//import controllers
const {
  deleteThread,
  deleteReply,
  getThread,
  getReplies,
  createThread,
  createReply,
  updateThread,
  updateReply,
} = require("../controllers");

// set up controllers and routes for /threads/:boards
router
  .route("/threads/:board")
  .get(getThread)
  .post(createThread)
  .delete(deleteThread)
  .put(updateThread);

// set up controllers and routes for /threads/:boards
router
  .route("/replies/:board")
  .get(getReplies)
  .post(createReply)
  .delete(deleteReply)
  .put(updateReply);

module.exports = router;
