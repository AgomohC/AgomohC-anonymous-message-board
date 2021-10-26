const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ThreadSchema = new mongoose.Schema(
  {
    board: {
      type: String,
      required: [true, "please input board name"],
    },
    text: {
      type: String,
      required: [true, "please input text"],
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Reply",
      },
    ],
    reported: {
      type: Boolean,
      default: false,
    },
    delete_password: {
      type: String,
      required: [true, "please input password"],
    },
  },
  {
    timestamps: true,
  }
);

//hash password before saving to the db

ThreadSchema.pre("save", async function () {
  this.delete_password = await bcrypt.hash(this.delete_password, 12);
});

// compare password with hash in db
ThreadSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.delete_password);
  return isMatch;
};
const Thread = mongoose.model("Thread", ThreadSchema);

module.exports = Thread;
