//import mini express
const exp = require("express")
const adminApiObj = exp.Router()

//import express-async-handlers
const expressHandlers = require("express-async-handler")

//import bcrypts
const bcryptjs = require("bcryptjs")
const Admin = require("../models/Admin")

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import payload
adminApiObj.use(exp.json())

//create a admin
//http://localhost:4000/admin/createadmin
adminApiObj.post("/createadmin",expressHandlers(async(req,res)=>{

    //search for admin in db with username
    let adminObjFromDb = await Admin.findOne({username : req.body.username})

    //if admin doesn't exists in db 
    if(adminObjFromDb == null){

        //hash password
        let hashedPw = await bcryptjs.hash(req.body.password,8)

        //create an obj for model
        const newAdminObj = new Admin({
            username : req.body.username,
            email : req.body.email,
            password : hashedPw
        })

        //save it to db
        await newAdminObj.save()
        res.send({message : "admin created successfully"})
    }
    else{
        res.send({message:"admin already exists in db"})
    }
}))


//http://localhost:4000/admin/loginuser
adminApiObj.post("/loginadmin",expressHandlers(async(req,res)=>{

    //search username in db
    let adminObjFromDb = await Admin.findOne({username:req.body.username})

    //user doesn't in db
    if(adminObjFromDb == null){
        
        res.send({message:"Invalid username"})
    }

    //username exists in db
    else{

        //compare passwords
        let passwords = await bcryptjs.compare(req.body.password,adminObjFromDb.password)

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
}
))


//export module
module.exports = adminApiObj