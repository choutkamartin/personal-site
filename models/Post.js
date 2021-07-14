import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  textCs: {
    type: String,
    required: true,
  },
  textEn: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
