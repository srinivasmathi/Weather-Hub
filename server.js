
const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
require('dotenv').confiq()

let cityName="Chennai";

app.post("/",function(req,res){
  cityName=req.body.cityName;
  res.redirect("/");
})

app.get("/",function(req,res){

  const API_KEY = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API+KEY;

  res.render('index')
})

app.listen(3000,function(){
  console.log("server started to the port 3000")
})
