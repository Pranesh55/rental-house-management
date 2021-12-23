const mongoose=require('mongoose')
const cities=require('../models/cities')
const Aminities=require('../models/aminities')
const streets=require('../models/streets')
const House=require('../models/house')
const User=require('../models/user')
const express=require('express')
const router=express.Router()

router.post('/',async(req,res)=>{
    const token=req.headers['token']
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// document.write(today);
    User.findOne({token:token},async(err,docs)=>{

        const house= new House({
            owner_id:docs.id,
            house_type:req.body.house_type,
            description:req.body.description,
            address:req.body.address,
            bedrooms:req.body.bedrooms,
            bathrooms:req.body.bathrooms,
            city_id:req.body.city_id,
            street_id:req.body.street_id,
            area:req.body.area,
            rent:req.body.rent,
            posted_date:today,
            deposit:req.body.deposit,
            pictures:req.body.pictures,
            furnishing:req.body.furnishing,
            is_available:req.body.is_available,
            available_for:req.body.available_for,
            aminities:req.body.aminities
        })
        try{
            const h=await house.save()
            res.json(h)
        }catch(err){
            console.log(err)
            res.status(500).send({message:"Server Error"})
        }    
    })
   
})
router.get('/',async(req,res)=>{
    try{
    const search=req.query.search
    console.log("search "+search )
    if(search==NULL){

        House.find({},(err,docs)=>{
            res.json(docs)
          
        })
    }
    var city={id:0,name:''};
    var location={id:0,name:''};
    for(let i=0;i<cities.length;i++){
        if(search==cities[i].name){
            city.id=cities[i].id
            city.name=cities[i].name
            break;
        }
    }
    if(city.name==''){ 
        for(let i=0;i<streets.length;i++){
            if(search==streets[i].name){
                location.id=streets[i].id
                location.name=streets[i].name
                break;
            }
        }
        House.find({street_id:location.id},(err,docs)=>{
            res.json(docs)
        })
    }else{
        console.log("city is "+city.id+" , "+city)
        House.find({city_id:city.id},(err,docs)=>{
            if(!err)
            res.json(docs)
            else{
                console.log(err)
            }
        })
    }
}catch(err){
    res.send('Error '+err)
}
})

module.exports=router