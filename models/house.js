const mongoose=require('mongoose')

// const houseType={
//     VILLA:"villa",
//     APARTMENT:"apartment",
//     INDEPENDENT_HOUSE:"independent_house"
// }
const houseSchema=mongoose.Schema({
    owner_id:{
        type:String,
        required:true
    },
    house_type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    city_id:{
        type:Number,
        required:true
    },
    street_id:{
        type:Number,
        required:true
    },
    area:{
        type:Number,
        required:false
    },
    rent:{
        type:Number,
        required:true
    },
    posted_date:{
        type:Date,
        required:true
    },
    deposit:{
        type:Number,
        required:true
    },
    pictures:{
        type:[],
        required:true
    },
    furnishing:{
        type:String,
        required:true
    },
    is_available:{
        type:Boolean,
        required:true
    },
    available_for:{
        type:String,
        required:true
    },
    aminities:{
        type:[],
        required:false
    }
})

module.exports=mongoose.model('House',houseSchema)