import { Comment } from "../models/comments.model.js";
import { Snippet } from "../models/snippet.model.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { errResponse } from "../utils/errResponse.utils.js";
import bcrypt from "bcrypt"

const getNextSetOfSnippets = asyncHandler(async (req, res) => {
  // Get the page number and limit from the query parameters
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);

  console.log(page, limit);

  // Calculate the offset
  const offset = (page - 1) * limit;

  // Fetch the users
  const users = await Snippet.find({}).select("-ownerToken")
    .sort({ createdAt: -1 }) // Sort by latest first
    .skip(offset)
    .limit(limit)
    .exec();

  if (users === []) {
    throw new errResponse(401, "User not found");
  }
  console.log(users);
  // Return the paginated data
  res.status(200).json(
    new apiResponse(
      200,
      {
        users,
        total: await Snippet.countDocuments(), // Total number of documents
      },
      "Next set of data sent successfully"
    )
  );
})

const addMySnippet = asyncHandler(async (req, res) => {
  const { snippetCode, snippetLanguage, discription, aliasName, ownerToken } =
    req.body;

    if (!snippetCode && !snippetLanguage ) {
        throw new errResponse(407 , "Please enter a valid Snippet and language")
    }
    if (!aliasName  ) {
        throw new errResponse(406 , "Please enter your alias")
    }
    if (!ownerToken) {
        throw new errResponse(409 , "OwnerToken not reached")
    }


    const hashedToken = await bcrypt.hash(ownerToken ,10) 

    const snippet = await Snippet.create({
        snippetCode : snippetCode,
        snippetLanguage :snippetLanguage,
        discription : discription,
        aliasName : aliasName,
        ownerToken : hashedToken

    })

    res.status(200).json(   new apiResponse(200 , snippet , "Snippet Uploaded Successfully"))
});


// const getComments = asyncHandler(async (req,res) =>{
//     const _id = req.query

//     await Comment.find({snippetId : _id})

// })


const deleteSnippet = asyncHandler(async(req,res)=>{
    const _id = req.body

    const deleteInstance = await Snippet.deleteOne({_id : _id})
    if (!deleteInstance) {
        throw new errResponse(407,"Snippet Not Found")
    }
    console.log(deleteInstance)

    res.status(200).json(new apiResponse(200, {
        "success" : deleteInstance.acknowledged,
        "noOfSnippetsDeleted" : deleteInstance.deletedCount
    }, "Snippet Deleted Successfully"))
   
})

export { getNextSetOfSnippets , addMySnippet , deleteSnippet};
