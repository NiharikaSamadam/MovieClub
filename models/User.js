//import mongoose
const mongoose = require("mongoose")

//create schema
const UserSchema = new mongoose.Schema({
    username : { 
                type:String,required:true,
                minlength:[4,"Minimimum length is 4"],
                match:[/^[a-zA-Z ]*$/,"Accepts alphabets and spaces only"]
               },
    email : {
                type:String,required:true,
                match: [/.+\@.+\..+/,"Invalid email"]
            },
    phone : {
                type:Number,required:true,
                minlength:[10,"Length should be 10 digits"],
                maxlength:[10,"Length should be 10 digits"],
                match:[/^[6789]\d{9}$/,"Invalid phonenumber"]
            },
    password : {type:String,required:true,
                 minlength:[4,"minilength should be 4"],
                 match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,"Must contain one capital letter,one small letter and onenumber"]},
    watchlist : Array,
    history : Array,
    favourites : Array
})


//define a model
const User = mongoose.model("user",UserSchema)

//export model
module.exports = User;