import {Router} from "express"
import { addComment, deleteComment, getCommentsBySnippetId } from "../controllers/comments.controllers.js"
const router = Router()

router.route("/add").post(addComment)
router.route("/delete").post(deleteComment)
router.route("/getBySnipppetId").get(getCommentsBySnippetId)



export default router