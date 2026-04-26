import js from "@eslint/js";
import axios, { AxiosError } from "axios";
const server = "/api/v1" 
const getMoreData = async (page) => {
  //returns an array of 8 json objects , each feild can be accessed by using .
  try {
    const jsonSnippets = await axios.get(
      `${server}/snippets/getnewsnippets?page=${page}&limit=8`
    );
    console.log( await jsonSnippets.data.data , "index.js")

    return jsonSnippets.data.data;
  } catch (error) {
    throw error;
    console.error(error);
  } finally {
    console.log("new snippets fetched successfully");
  }
};
// const dataArray = await getMoreData(1)
// console.log(dataArray[0]._id)

const addSnippet = async (snippet) => {
  try {
    const snippetAddInstance = await axios.post(
      `${server}/snippets/addMySnippet`,
      snippet
    );
    return snippetAddInstance.data;
  } catch (error) {
    throw error;
  } finally {
    console.log("Snippet added to db");
  }
};
// const snippet = {
//   snippetCode: "rm -rf /",
//   snippetLanguage: "shell",
//   aliasName: "laddu",
//   ownerToken: "$2b$10$TnAZVyfjkpweOz5aCQzLf.ZIUh9eYoRi5D24BfydTqc/rE0njsUim",
//   discription: "bla bla bla ",
// };
// console.log(await addSnippet(snippet));

const deleteSnippet = async (id) => {
  console.log(id);
  try {
    const deleteInstance = await axios.post(
      `${server}/snippets/deleteMySnippet`,
      {
        _id: id,
      }
    );
    return deleteInstance.data;
  } catch (error) {
    throw error;
  } finally {
    console.log("Snippet deleted");
  }
};

// console.log(await deleteSnippet(String('69eabede457307a1231325ee')))
const getSnippetById = async (id) => {
  try {
    const snippet = await axios.get(
      `${server}/snippets/getSnippetById?_id=${id}`
    );
    return snippet.data;
  } catch (error) {
    throw error;
  } finally {
    ("Snippet fetched for given id");
  }
};

// console.log(await getSnippetById(String("69eabef3457307a1231325f0")))

//add   /add
//delete  /delete
//getcommentswrtsnippets   /getBySnipppetId?snippetId=69eabede457307a1231325ee
// {{server}} = ${server}/comments

const addComment = async (comment) => {
  try {
    const addCommentInstance = await axios.post(
      `${server}/comments/add`,
      comment
    );
    return addCommentInstance.data;
  } catch (error) {
    throw error;
  } finally {
    console.log("Comment added");
  }
};
// const comment = {
//   "snippetId": "69eabede457307a1231325ee",
//   "commentText": "bro just use n % 2 == 0, one line",
//   "gifUrl": null,
//   "aliasName": "SegfaultSam",
//   "ownerToken": "$2b$10$abc456hashedtokenvalue1",

// }
// console.log(await addComment(comment))

const deleteComment = async (commentId) => {
  try {
    const deleteInsatance = await axios.post(
      `${server}/comments/delete`,
      {"commentId" : commentId}
    );
    return deleteInsatance.data;
  } catch (error) {
    throw error;
  } finally {
    console.log("Comment deleted");
  }
};

// console.log(await deleteComment(String("69ebbf2acbbfadf3aedf7115")))

const getcommentswrtsnippets =  async(snippetId)=>{
    try {
        const comments = await axios.get(`${server}/comments/getBySnipppetId?snippetId=${snippetId}`)
        return comments.data
    
    } catch (error) {
        throw AxiosError
    }finally{
        console.log("Fetched all comments for this snippet")
    }
}

// console.log(await getcommentswrtsnippets(String("69eabef3457307a1231325f0")))


export {getMoreData , addSnippet , deleteSnippet , getSnippetById , addComment , deleteComment , getcommentswrtsnippets}