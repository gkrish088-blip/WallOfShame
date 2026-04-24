import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    /*snippet code 
discription (optional)
language
aliasName
ownerToken*/

    snippetCode: {
      type: String,
      required: true,
    },
    snippetLanguage: {
        type:String,
        required:true
    },
    discription:{
        type:String,
    },
    aliasName:{
        type:String,
        required:true
    },
    ownerToken:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

export const Snippet = mongoose.model("Snippet" ,SnippetSchema)