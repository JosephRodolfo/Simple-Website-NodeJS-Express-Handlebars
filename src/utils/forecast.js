const request = require("request");
//const config = require('../../config/config')

let API_KEY_WEATHER = process.env.API_KEY_WEATHER;


const forecast = (lat, long, callback)=> {

    const url = `http://api.weatherstack.com/current?access_key=${API_KEY_WEATHER}&query=${lat},${long}&units=f`;
    console.log(url);
    
    
    
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
          callback("Unable to connect", undefined);
        } else if (body.error) {
          callback("Unable to find location. Please try another search", undefined);
        } else {
          callback(undefined, {
        message: `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`
    
    
    
          });
        }
      });
    
    
    }
    module.exports= forecast;