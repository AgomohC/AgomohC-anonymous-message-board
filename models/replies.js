const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ReplySchema = new mongoose.Schema(
  {
    board: {
      type: String,
      required: [true, "please input board name"],
    },
    text: {
      type: String,
      required: [true, "please input text"],
    },

    thread_id: {
      type: mongoose.Types.ObjectId,
      ref: "Thread",
      required: [true, "please input thread id"],
    },
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
ReplySchema.pre("save", async function () {
  this.delete_password = await bcrypt.hash(this.delete_password, 12);
});

// compare password with hash in db
ReplySchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.delete_password);
  return isMatch;
};
const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;
