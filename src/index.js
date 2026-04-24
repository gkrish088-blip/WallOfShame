import dotenv from "dotenv"
import mongoose from "mongoose"
import { connectDb } from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDb()
.then(
    app.listen( process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at port : ${process.env.PORT || 8000}`)
    })
)
.catch((error)=>{
    console.log(`Connection Failed due to : ${error}`)
})