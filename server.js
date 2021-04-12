//import express
const exp = require("express")
const app = exp()

//import dotenv
require("dotenv").config()

//import path
const path = require("path")

//connect server to the app server
app.use(exp.static(path.join(__dirname,"dist/online-video-gallery")))

//connections to database
const mongoose = require("mongoose")

mongoose.connect(process.env.DBURL,{useNewUrlParser:true,useUnifiedTopology:true})

//get default connection object
const db = mongoose.connection;

db.on('error',() => console.log("error in conneting to db"))

db.once('open',() => console.log("Connected to database"))


//import APIS
const userApiObj = require("./APIS/user-api")
const adminApiObj = require("./APIS/admin-api")
const movieApiObj = require("./APIS/movie-api")

//forwarding paths
app.use("/user",userApiObj)
app.use("/admin",adminApiObj)
app.use("/movie",movieApiObj)

//Invalid path middlewares
app.use((req,res,next) => {
   
    res.send({message: req.url +" is Invalid"})
})

//express-async-handler middle wares
app.use((err,req,res,next)=>{
    res.send({message:"failed",reason:err.message})
    console.log(err)
}) 


//assign port
const port = process.env.PORT||4000
app.listen(port,() => console.log(`server started at port on ${port}`))