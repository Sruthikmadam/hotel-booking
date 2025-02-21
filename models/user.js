const mongoose=require("mongoose");
const { validate } = require("uuid");
const { isEmail } =require("validator")
const bcrypt= require('bcrypt')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true    
    },
    email:{
        type:String,
        required:[true,"Please Enter email"],
        unique: true,
        validate:[isEmail,"please enter valid email"],
        lowercase:true

    },
    hashpassword:{
            type:String,
            required:[true,"Please Enter password"],
            minlength:[5,"Minimum password length is 5 "]
            


        },
    isAdmin:{
            type:Boolean,
            required:true,
            default:"false"
        
        }}
    ,{timestamp:true})

// fire a function before doc saved to db

// userSchema.pre('save',async function (next){
//     const salt=await bcrypt.genSalt();
//     this.password= bcrypt.hash(this.password,salt);
//     next();
// })

// static method to login user
// userSchema.statics.login=async function(email,password){
// const user= await this.findOne({email});
// if(user){
//     const auth=await bcrypt.compare(password,user.password);
//     if(auth){
//         console.log("auth",user)
//         return(user)
//     }
//     throw Error('incorrect password')
// }
// throw Error("incorrect email")
// }
    const userModel=mongoose.model('user',userSchema);

module.exports =userModel