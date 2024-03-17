import express  from "express";
import cors from"cors"; // it will connect fronted to the Backend 
import cookieParser from "cookie-parser"; // it will help to store the cookie in the local system

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,  // it will get the data from env file where it will help to connect the domain
    credentials: true
}))

app.use(express.json({limit:"16kb"})) // limit the json file 

app.use(express.urlencoded({
    extended : true,
    limit:"16kb"
}))  // it will auto adjust  the url 
app.use(express.static("public"))// create a Public file where it will store photo/picture

app.use(cookieParser())


// routes import 

import userRouter from "./routes/user.routes.js";

// route Declaration

app.use("/api/v1/users", userRouter)
app.get("/",(req,res)=>{
    res.send("hello")
})
// app.use("/help",userRouter)

export {app}