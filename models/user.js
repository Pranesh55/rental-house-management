const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        required:false
    },
    user_type:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
})
module.exports=mongoose.model('User',userSchema)