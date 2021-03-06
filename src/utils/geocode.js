const request = require("request");
//const config = require('../../config/config')

let API_KEY_GEOCODE = process.env.API_KEY_GEOCODE;

const geocode = (address, callback) => {
    const url =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${API_KEY_GEOCODE}&limit=1`;
  
    request({ url: url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to location", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Please try another search", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    });
  };

  module.exports = geocode;