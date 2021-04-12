//import miniexpress
const exp = require("express")
movieApiObj = exp.Router()

//import express-async-handler
const expressHandlers = require("express-async-handler")

//import Model
const Movie = require("../models/Movie")

//import verifyToken
const validateToken = require("./middlewares/verifyToken")

//imports
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:'drudeeylj',
    api_key:'381539586774675',
    api_secret: 'loiOEfGtH_edKpA1WU3LOoo7u6E' 
 });

//cofigure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'videogallery', 
    public_id: file.fieldname + '-' + Date.now()
    }},
   });

//configure multer
var upload = multer({ storage: storage })

//import payload
movieApiObj.use(exp.json())

//http://localhost:3000/movie/createmovie
movieApiObj.post("/createmovie",validateToken,upload.single('image'),expressHandlers(async (req,res)=>{

      //the req.body.userObj is in JSON,so convert to object
   req.body=JSON.parse(req.body.movieObj)
   req.body.image=req.file.path;
   console.log(req.body)
    //search for movie in db with movie name
    let movieObjFromDb = await Movie.findOne({$and:[{moviename:req.body.moviename},{language:req.body.language}]})

    //if moviename doesn't exists in db
    if(movieObjFromDb == null){

        //create obj for model
        const newMovieObj = new Movie({
            language : req.body.language,
            moviename : req.body.moviename,
            description : req.body.description,
            image : req.body.image,
            genres : req.body.genres,
            cast : req.body.cast,
            director : req.body.director,
            status : true
        })

        await newMovieObj.save()
        res.send({message:"Movie added successfully"})
    }

    //if already exists in db
    else{
        
        res.send({message:"Movie already exists... Plesae insert another one"})
    }
}))


//http://localhost:3000/movie/getallmovies
movieApiObj.get("/getallmovies",validateToken,expressHandlers(async(req,res)=>{

    //get array of movies from db
    let moviesArray = await Movie.find({status:true})

    res.send({message:moviesArray})
}))

//http://localhost:3000/movie/deletemovie
movieApiObj.post("/deletemovie",validateToken,expressHandlers(async(req,res)=>{
    
    //delete the movie from db whose movie name and language 
    let movieObjToBeDel = await Movie.updateOne({$and:[{moviename:req.body.moviename},{language:req.body.language}]},{status:false}) 
   
    //get the movies list
    let moviesArray = await Movie.find()
    
    res.send({message:"Movie deleted successfully", newMoviesArray:moviesArray})
}))


//http://localhost:3000/movie/getmoviebyname
movieApiObj.post("/getmoviebyname",validateToken,expressHandlers(async(req,res)=>{
    
    //get the details of movie by moviename
    let movieDetails = await Movie.findOne({$and:[{moviename:req.body.moviename},{language:req.body.language},{status:true}]})

    res.send({message:movieDetails})
}))


//http://localhost:3000/movie/updatemovie/:moviename
movieApiObj.put("/updatemovie/:moviename",validateToken,expressHandlers(async(req,res)=>{
   
    
     let result = await Movie.updateOne({$and:[{moviename:req.params.moviename},{language:req.body.language}]},{moviename:req.body.moviename
                                         ,cast:req.body.cast,director:req.body.director})

     res.send({message:"Updated Successfully..."})
}))


//http://localhost:3000/movie/getmovie/moviename
movieApiObj.get("/getmovie/:search",validateToken,expressHandlers(async(req,res) => {

    //get movies by moviename
    let movie = await Movie.find({$or:[{moviename:req.params.search},{genres:req.params.search}]})
    
    res.send({message:movie})

}))
//export api
module.exports = movieApiObj