const express=require('express')
const router=express.Router()
const User=require('../models/user.js')
const House=require('../models/house.js')
const jwt = require('jsonwebtoken');

router.get('/',async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(err){
        res.send('Error '+err)
    } 
})

router.post('/register',async(req,res)=>{
    // try{
        var isMobileAvailable=false
        User.count({email:req.body.email},async(err,docs)=>{
            if(docs==0){
                isMobileAvailable=true
                console.log("docs size is 0")
                const user=new User({
                    name:req.body.name,
                    age:req.body.age,
                    user_type:req.body.user_type,
                    mobile:req.body.mobile,
                    email:req.body.email,
                    password:req.body.password,
                    token:require('crypto').randomBytes(64).toString('hex')
                })
                try{
                    const u=await user.save()
                    res.json(u)
                }catch(err){
                    res.send('Error')
                }      
            }else{
                console.log("docs is "+docs)
                res.status(422).send({message:"Email Already exists"})
            }
        })
       
})
router.post('/login',async(req,res)=>{
    // try{
        
        try{
            User.count({email:req.body.email,password:req.body.password},function(err,docs){
               if(docs==1){
                   User.findOne({email:req.body.email,password:req.body.password},async(err,docs)=>{
                       const user=docs
                        user.token=require('crypto').randomBytes(64).toString('hex')
                        const u=await user.save()
                        res.json(u)
                   })
               }else{
                   var error={message:"User Not Found"}
                   res.status(404).send(error)
               }
            })
            
        }catch(err){
            res.send('Error '+err)
        }        
})


module.exports=router