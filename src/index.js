import connectDB from "./db/index.js";
import  dotenv from "dotenv";


dotenv.config({
    path:'./env'
})

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
        console.log("error: server is not running",error);
        throw error
    })
})
.catch((err) =>{
    console.log("mogo db COnnection faiked !!!", err);
})