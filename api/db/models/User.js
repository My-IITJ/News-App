const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
  },
  Title: {
    type: String,
  },
  subscribedTags: [
    {
      tag: {
        type: Schema.Types.ObjectId,
        ref: "tag",
      },
    },
  ],
  profileImg: {
    type: String,
  },
  resume: {
    tyle: String,
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    },
  ],
  savedPosts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
