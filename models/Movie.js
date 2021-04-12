//import mongose
const mongoose = require("mongoose")

//create a schema
const MovieSchema = mongoose.Schema({
    "language" : {type:String,required:true},
    "moviename": {type:String,required:true},
    "description":{type:String,required:true},
    "image":{type:String,required:true},
    "genres":{type : Array, required:true},
    "cast" : {type : String, required:true},
    "director":{type: String,required:true},
    "status" : {type : Boolean,required:true}
})


//create a model
const Movie = mongoose.model("Movie",MovieSchema)

//export model
module.exports = Movie;