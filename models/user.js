const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
            type:String,
            required:true
        },
    isAdmin:{
            type:Boolean,
            required:true,
            default:"false"
        
        }}
    ,{timestamp:true})
    const userModel=mongoose.model('user',userSchema);

module.exports =userModel