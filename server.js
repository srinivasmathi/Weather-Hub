
const express = require("express")
const app = express()
const https = require('https')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
require('dotenv').config()

let cityName="Chennai";
let defaultCity = "Chennai";

let currentWeather = new Object()
let forecastWeather = []

app.post("/",function(req,res){
  cityName=req.body.cityName;
  res.redirect("/");
})

app.get("/",function(req,res){

  const API_KEY = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY+"&units=metric";

  https.get(url,function(response){

    if(response.statusCode == 200 ){
      response.on('data',function(data){
        getCurrentWeather(data)

        //making another API call to forecast weather for next 15hours(three hour forecast)
        const forecast_url = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&cnt=5&appid="+API_KEY+"&units=metric";
        https.get(forecast_url,function(ress){
          if(ress.statusCode == 200){
            ress.on('data',function(data){
              getForecastedWeather(JSON.parse(data))
              console.log(forecastWeather)
              res.render('index',{"currentData":currentWeather,"forecastData":forecastWeather});
            })
          }
        })
      })
    }
    else{
      cityName=defaultCity;
      res.redirect("/");
      console.log("failure");
    }
  })
})

function getDate(){
  const date = new Date();
  options = {
    hour:"numeric",
    minute:"numeric",
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
  }
  const strDate = date.toLocaleDateString("en-US",options)
  return strDate;
}

function getForecastedWeather(data){
  forecastWeather =[]
  data.list.forEach(function(item){
    forecastWeather.push({
      time:getTime(item.dt),
      temperature:item.main.temp,
      description:item.weather[0].description,
      iconURL:"http://openweathermap.org/img/wn/"+item.weather[0].icon+".png",
    })
  })
}

function getCurrentWeather(data){
  const jsonData = JSON.parse(data)
  console.log(jsonData)
  currentWeather = {
    description:jsonData.weather[0].description,
    iconURL: "http://openweathermap.org/img/wn/"+jsonData.weather[0].icon+".png",
    cityName:jsonData.name,
    temperature:jsonData.main.temp,
    highTemp:jsonData.main.temp_max,
    lowTemp:jsonData.main.temp_min,
    pressure:jsonData.main.pressure,
    humidity:jsonData.main.humidity,
    datetime:getDate(),
    windSpeed:jsonData.wind.speed,
  }
}


function getTime(number){
  const time = new Date(number*1000).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric"})
  return time.toString()
}

app.listen(3000,function(){
  console.log("server started to the port 3000")
})
