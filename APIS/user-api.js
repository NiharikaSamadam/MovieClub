//import mini express
const exp = require("express")
const userApiObj = exp.Router()

//import express-async-handlers
const expressHandlers = require("express-async-handler")

//import User model
const User = require("../models/User")
const Movie = require("../models/Movie")

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import dotenv
require("dotenv").config()

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import token
const validateToken = require('./middlewares/verifyToken')


//import payload
userApiObj.use(exp.json())

//insert user data to database
//http://localhost:4000/user/createuser
userApiObj.post("/createuser",expressHandlers(async(req,res)=>{

    //search for user in db with username
    let userObjFromDb = await User.findOne({username : req.body.username})

    //if user doesn't exists in db
    if(userObjFromDb == null){

        //hash the password
        let hashedPw = await bcryptjs.hash(req.body.password,8)

        //create an obj for model
        let newUserObj = new User({
            username : req.body.username,
            email : req.body.email,
            phone : req.body.phone,
            password : hashedPw
        })

        //save it to db
        await newUserObj.save()

        res.send({message:"user created successfully"})
    }

    else{
        res.send({message:"user already exists...Please choose another one"})
    }
})) 


//http://localhost:4000/user/loginuser
userApiObj.post("/loginuser",expressHandlers(async(req,res)=>{

    //search username in db
    let userObjFromDb = await User.findOne({username:req.body.username})

    //user doesn't in db
    if(userObjFromDb == null){
        
        res.send({message:"Invalid username"})
    }

    //username exists in db
    else{

        //compare passwords
        let passwords = await bcryptjs.compare(req.body.password,userObjFromDb.password)

        //if passwords doesn't match
        if(passwords == false){
            res.send({message:"Invalid Password"})
        }

        //passwords are matched
        else{

            //create and sign the token
           const signedToken = await jwt.sign({username:req.body.username},process.env.SECRET,{expiresIn : 1000})

            res.send({message:"Login Success",token:signedToken,username:req.body.username})
        }
    }

}))


//http://localhost:3000/user/getuser/username
userApiObj.get('/getuser/:username',validateToken,expressHandlers(async(req,res)=>{

    //get the user from db
    let userObj = await User.findOne({username:req.params.username})
    
    res.send({message:userObj})
}))


//http://localhost:3000/user/addtowatchlist/username
userApiObj.put('/addtowatchlist/:username',validateToken,expressHandlers(async(req,res)=>{

    
    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})
   
     let watchlistArray = userObjFromDb.watchlist
     
     let c = 0;
     for(let i of watchlistArray){
         if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
             c++;
         }
     }

     //moviename and language are not same then add to watchlist
     if(c == 0){
        watchlistArray.push(req.body)
        let result = await User.updateOne({username:req.params.username},{watchlist:watchlistArray})
       
        //send response
        res.send({message:"Movie added to watchlist...."})
     }

     //if already exists in warchlist collection
     else{
         res.send({message:"Movie already exists in watchlist....."})
     }

}))

//http://localhost:3000/user/getmovies/username
userApiObj.get('/getmovies/:username',validateToken,expressHandlers(async(req,res)=>{

    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})

    let watchlistArray =  userObjFromDb.watchlist
    let watchlist = []

    for(let i of watchlistArray){
        let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
        if(movie != null){
            watchlist.push(movie)
        }
    }
    
    res.send({watchList:watchlist})

}))


//http://localhost:3000/user/deletefromwatchlist
userApiObj.post('/deletefromwatchlist',validateToken,expressHandlers(async(req,res)=>{

    
    //get user from db
    let userObjFromDb = await User.findOne({username:req.body.username})

    let watchlistArray = userObjFromDb.watchlist
   
    let watchlist = []
    

    for(let [ind,i] of watchlistArray.entries()){

        if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
            watchlistArray.splice(ind,1)
            
            let result = await User.updateOne({username : req.body.username},{watchlist:watchlistArray})
            for(let i of watchlistArray){
                let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
                if(movie != null){
                    watchlist.push(movie)
                }
            }
            
            res.send({message:"deleted successfully...",newArray : watchlist})
            break;   
        }
    }
    
   
    
}))


//http://localhost:3000/user/addtohistory/username
userApiObj.put('/addtohistory/:username',validateToken,expressHandlers(async(req,res) => {
    
    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})

    let historyArray = userObjFromDb.history
    let c = 0

    for(let i of historyArray){
        if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
            c++;
        }
    }

    if(c == 0){

        historyArray.push(req.body)
        let result = await User.updateOne({username : req.params.username},{history:historyArray})
        res.send({message:"Movie added to history.."})
    }
    else{
        res.send({message:"Movie already exists in history"})
    }


}))


//http://localhost:3000/user/getmoviesfromhistory/username
userApiObj.get('/getmoviesfromhistory/:username',validateToken,expressHandlers(async(req,res) => {

    //get the movies from history
    let userObjFromDb = await User.findOne({username : req.params.username})

    let historyArray = userObjFromDb.history;
    
    let history = []

    for(let i of historyArray){
        let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
        if(movie != null){
            
            history.push(movie)
        }
    }
    
    res.send({history : history})

}))

//http://localhost:3000/user/deletefromhistory
userApiObj.post("/deletefromhistory",validateToken,expressHandlers(async(req,res) => {
  
    //get user from db
    let userObjFromDb = await User.findOne({username : req.body.username})

    let historyArray = userObjFromDb.history
   
    let history = []

    for(let [ind,i] of historyArray.entries()){
        if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
           
            historyArray.splice(ind,1)
            let result = await User.updateOne({username:userObjFromDb.username},{history : historyArray})
           
            for(let i of historyArray){
                let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
                if(movie != null){
                    
                    history.push(movie)
                }
            }
            res.send({message:"movie deleted successfully",newArray : history})
            break;
        }
    }
}))


//http://localhost:3000/user/addtofavourites/username
userApiObj.put('/addtofavourites/:username',validateToken,expressHandlers(async(req,res) => {
    

    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})

    let favouritesArray = userObjFromDb.favourites
    let c = 0;
    for(let i of favouritesArray){
        if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
            c++;
        }
    }
    
    if(c == 0){
       favouritesArray.push(req.body)
       let result = await User.updateOne({username:req.params.username},{favourites:favouritesArray})
       res.send({message: "Added to favourites.."})
    }
    else{
        res.send({message:"Already exists in favourites..."})
    }

}))

//http://localhost:3000/user/getfavourites/username
userApiObj.get('/getfavourites/:username',validateToken,expressHandlers(async(req,res) => {

    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})

    let favouritesArray = userObjFromDb.favourites

    let favourites = []

    for(let i of favouritesArray){
        let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
        if(movie != null){
            favourites.push(movie)
        }
    }
    res.send({favourites : favourites})
}))


//http://localhost:3000/user/deletefavourites/username
userApiObj.put("/deletefavourites/:username",validateToken,expressHandlers(async(req,res) => {

    //get user from db
    let userObjFromDb = await User.findOne({username:req.params.username})

    let favouritesArray = userObjFromDb.favourites

    let favourites = []

    for(let [ind,i] of favouritesArray.entries()){
        if((i.moviename == req.body.moviename) && (i.language == req.body.language)){
            favouritesArray.splice(ind,1)
            let result = await User.updateOne({username:req.params.username},{favourites:favouritesArray})
            
            for(let i of favouritesArray){
                let movie = await Movie.findOne({$and:[{moviename:i.moviename},{language:i.language},{status : true}]})
                if(movie != null){
                    favourites.push(movie)
                }
            }

            res.send({message:"Removed from favourites..",favourites:favourites})
        }
    }


}))
//export user-api
module.exports = userApiObj