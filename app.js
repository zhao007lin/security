import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import bodyParser from "body-parser"
import ejs from "ejs"
import mongoose from "mongoose";
import User from "./model/User.js";
import encrypt from "mongoose-encryption"

const app = express()

app.use(express.static("public"));
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://zhao007lin:zhaolin@cluster1.whqqtvl.mongodb.net/?retryWrites=true&w=majority")



app.get("/", function (req, res) {
    res.render("home")
    
})

app.get("/login", function (req, res) {
    res.render("login")
    
})

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {if (foundUser){
            if (foundUser.password===password) {
                res.render("secrets")
            }

        }}
        
    })

})
app.get("/register", function (req, res) {
    res.render("register")
    
})
app.post("/register", function (req, res) {
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    })


    newUser.save(function (err) {
    if(err) {
    console.log(err);
    } else { res.render("secrets")}
 } );
})
app.listen(3000, function () {
    console.log("Server started on port 3000!");
    
})
