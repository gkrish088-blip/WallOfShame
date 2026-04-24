import { Comment } from "../models/comments.model.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { errResponse } from "../utils/errResponse.utils.js";
import bcrypt, { hash } from "bcrypt"

const addComment = asyncHandler(async (req,res)=>{
    const {ownerToken , commentText , snippetId , aliasName , commentGif} = req.body
    if (!ownerToken && !snippetId && !aliasName) {
        throw new errResponse(401 , "Unauthorised request")
    }
    if(!commentText){
        throw new errResponse(403 , "Content not found")
    }
    const hashedToken = await bcrypt.hash(ownerToken, 10)
    const commentCreated = await Comment.create({
        ownerToken : hashedToken,
        commentText : commentText,
        commentGif : commentGif || undefined,
        snippetId : snippetId,
        aliasName : aliasName
    })

    if(!commentCreated) {
        throw new errResponse(501 , "Comment not created")
    }

    return res.status(200).json(new apiResponse(200 , commentCreated , "New comment created"))
})

const deleteComment = asyncHandler(async (req,res)=>{
    const {commentId} = req.body
    const  deleteCommentInstance = await Comment.findByIdAndDelete(commentId)

    if(!deleteCommentInstance){
        throw new errResponse(405 , "comment not found")
    }

    console.log(deleteCommentInstance)
    return res.status(200).json(new apiResponse(200 , deleteCommentInstance))
})

const getCommentsBySnippetId = asyncHandler(async (req,res)=>{
    const {snippetId} = req.query
    if (!snippetId) {
        throw new errResponse(401 , "Snippet not found")
    }
    const commentsWRTSnippet = await Comment.find({snippetId:snippetId})
    console.log(commentsWRTSnippet)
    // validation remaining 
    res.status(200).json(new apiResponse(200,commentsWRTSnippet,"Comments for this snippet fetched"))
})

export {addComment , deleteComment , getCommentsBySnippetId}