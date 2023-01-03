
let thunderstorm = [
  "thunderstorm with light rain","thunderstorm with rain",
  "thunderstorm with heavy rain","light thunderstorm","thunderstorm","heavy thunderstorm","ragged thunderstorm",
  "thunderstorm with light drizzle","thunderstorm with drizzle","thunderstorm with heavy drizzle"
]

let drizzle = [
  "intensity drizzle","drizzle","heavy intensity drizzle","light intensity drizzle rain","drizzle rain","heavy intensity drizzle rain",
  "shower rain and drizzle","heavy shower rain and drizzle","shower drizzle"
]

let rain =[
  "light rain","moderate rain","heavy intensity rain","very heavy rain","extreme rain","freezing rain","light intensity shower rain",
  "shower rain","heavy intensity shower rain","ragged shower rain"
]

let snow = [
  "light snow","snow","heavy snow","sleet","light shower sleet","shower sleet",
  "light rain and snow","rain and snow","light shower snow","shower snow","heavy shower snow"
]

let mist = [
  "mist","Smoke","haze","sand/ dust whirls","fog","sand","dust","volcanic ash","squalls","tornado"
]

let clouds = [
  "few clouds","scattered clouds","broken clouds","overcast clouds"
]

let img_description = document.getElementById("description").innerHTML;

if(img_description != null)
{
  console.log(img_description)
  let element = document.querySelector("body")
  if(img_description === "clear sky"){
    element.classList.add("sunny");
  }else if (clouds.includes(img_description)) {
    element.classList.add("clouds");
  }else if (thunderstorm.includes(img_description) || drizzle.includes(img_description) || rain.includes(img_description)){
    element.classList.add("rainy");
  }else if (snow.includes(img_description)){
    element.classList.add("snow");
  }else{
    element.classList.add("mist");
  }
}
else{
  console.log("no element exist with that Tag!");
}
