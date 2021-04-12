//import mongoose
const mongoose = require("mongoose")

//create a schema
const AdminSchema = new mongoose.Schema({
    username : {
                 type : String, 
                 required:true,
                 minlength:[4,"Minimimum length is 4"],
                 match:[/^[a-zA-Z ]*$/,"Accepts alphabets and spaces only"]
                },
    email :    {
                type : String,required : true,
                match: [/.+\@.+\..+/,"Invalid email"]
               },
    password : {
                 type : String, 
                 required:true,
                 minlength:[4,"minilength should be 4"],
                 match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,"Must contain one capital letter,one small letter and onenumber"]
                }
})

//define a model
const Admin = mongoose.model("Admin",AdminSchema)


//export model
module.exports = Admin;