import express from "express"
import cors from "cors"
// import multer from "multer"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())
const upload = multer()
app.use(upload.none())

// import router
import snippetRouter from "./routes/snippet.routes.js"
import multer from "multer"


// routesDeclaration
app.use("/api/v1/snippets", snippetRouter)  // so here actuall rote becomes http://localhost:8000/api/v1/users
// and after this contoll moves to userRouter where actuall rote becomes http://localhost:8000/api/v1/users/register

 

export { app }