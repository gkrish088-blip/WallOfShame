import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    /*ownerToken
snippetid (snippet)
comment text
commentGifs
aliasName */

    ownerToken: {
      type: String,
      required: true,
    },
    snippetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    aliasName: {
      type: String,
      required: true,
    },
    commentGif: {
      type: String
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment" , commentSchema)