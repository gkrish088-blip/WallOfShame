import { useState } from "react";
import { getcommentswrtsnippets, addComment, deleteComment } from "../api/index.js";

const useComments = (snippetId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getcommentswrtsnippets(snippetId);
      console.log(data , "usecomments.js")
      setComments(data.data);
    } catch (error) {
      setError("Failed to fetch comments" , error);
    }finally{
        setLoading(false)
    }
  };

  const postComment = async (commentData) =>{
    try {
        const newComment = await addComment(commentData)
        setComments((prev)=> [newComment.data , ...prev])
    } catch (error) {
        setError("Failed to post Comment" , error)     
    }
  }

  const removeComment = async (commentId) => {
    try {
    await deleteComment(commentId)
    setComments((prev)=> prev.filter((c) => c._id !== commentId))     // loop all the prev array and filter the comment with this id out 
    } catch (error) {
        setError("failed to remove comment" , error)
    }
  }

  return {comments , loading , error , fetchComments , postComment , removeComment}
};

export default useComments