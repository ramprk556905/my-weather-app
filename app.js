const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
 res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const unit = "metric"
  const apiKey = "0be83e0b7f804a1cbe5241499ac56352";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const cityName = weatherData.name;
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p><Strong>The Weather condition is <em>"+desc+"</em></strong></p>");
      res.write("<h1>The temperature in "+cityName+" is "+temp+" &#8451;</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
})


/*

  const query = cityName;
  const unit = "Metrics"
  const apiKey = "0be83e0b7f804a1cbe5241499ac56352";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const cityName = weatherData.name;
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p><Strong>The Weather condition is <em>"+desc+"</em></strong></p>");
      res.write("<h1>The temperature in "+cityName+"is"+temp+" &#8451;</h1>");
      res.write("<img src="+imageURL+"style=>");
      res.send();
    });
  });
*/

app.listen(process.env.PORT || 3000,function(){
  console.log("The server is running in port 3000");
})
