import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Userschema = new Schema (
    {
            username:{
                type:String,
                required: true,
                unique: true,
                lowercase:true,
                trim: true,
                index: true

            },
            email:{
                type:String,
                required: true,
                unique: true,
                lowercase:true,
                trim: true,
                index: true

            },
            Fullname:{
                type:String,
                required: true,
                trim: true,
                index: true

            },
            avatar: {
                type: String,
                required: true,

            },
            CoverImage:{
                type : String,
            },
            watchHistory:[
            {
                type: Schema.Types.ObjectId,
                reg:"video"
            }],
            password:{
                type:String,
                required:[true,'Password is Required']
            },
            RefreshToken:{
                 type: string,   
            }

    },{
            timestamps:true
    }
)

Userschema.pre("save",async function (next){
    if(!this.isModified("password"))
    return next();
    this.password = bcrypt =bcrypt.hash(this.password,10)
    .next()
})
Userschema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

Userschema.methods.generateAccessToken = function(){
      return  jwt.sign({
            _id: this._id,
            email: this.email,
            username : this.username,
            fullname: this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
}
Userschema.methods.generateRefreshToken = function (){
    return  jwt.sign({
        _id: this._id,
        

    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )

}

export const User = mongoose.model("User",Userschema)