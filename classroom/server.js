const express = require("express");
const app = express();
const session = require("express-session")
const flash = require("connect-flash");
const path = require("path")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




app.use(
    session({
        secret: "mysuperkey",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());

app.get("/register",(req,res)=>{
    let {name ="Rushiii"} = req.query;
    req.session.name = name;
    if(name == "Rushiii"){
        req.flash("error","user not found")
    }
    else{
        req.flash("success","user registered successfully")
    }
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.locals.successMsg= req.flash("success");
    res.locals.errorMsg= req.flash("error");
    res.render("page.ejs",{ name : req.session.name})
})

app.get("/test", (req, res) => {
    res.send("test succesfull")
})
app.listen(5500, () => {
    console.log("all good")
})