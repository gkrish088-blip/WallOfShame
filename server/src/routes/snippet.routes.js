import { Router } from "express";
import { addMySnippet, deleteSnippet, getNextSetOfSnippets, getSnippetById } from "../controllers/snippet.controller.js";
const router = Router()

router.route("/getnewsnippets").get(getNextSetOfSnippets)
router.route("/addMySnippet").post(addMySnippet)
router.route("/deleteMySnippet").post(deleteSnippet)
router.route("/getSnippetById").get(getSnippetById)


export default router