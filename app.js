const express=require('express')
const url = "mongodb+srv://rental-house-bootathon2:bootathon2@cluster0.5ypjo.mongodb.net/Rental?retryWrites=true&w=majority";
const mongoose=require('mongoose')
const userRoutes=require('./routers/users')
const houseRoutes=require('./routers/houses')
const { MongoClient } = require('mongodb');

const app=express()
var PORT= process.env.PORT || 9000;

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true })
const con=mongoose.connection
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Connected...")
//   client.close();
// });
con.on('open',()=>{
    console.log("Connected...")
})
// con.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });
app.use(express.json())
app.use('/users',userRoutes)
app.use('/houses',houseRoutes)
app.listen(PORT,()=>{
    console.log('started')
})